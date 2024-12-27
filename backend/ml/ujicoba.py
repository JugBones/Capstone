from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import PeftModel
import torch

# Base and adapter models
base_model_name = "tiiuae/falcon-7b-instruct"
adapter_model_name = (
    "joshualxndrs/Student-Recommendation-falcon-7b-instruct-ft-adapters"
)

# Configure 4-bit quantization for memory efficiency
bnb_config = BitsAndBytesConfig(
    load_in_8bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
)

# Load base model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(base_model_name, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    base_model_name,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
)

# Load the fine-tuned adapters
model = PeftModel.from_pretrained(model, adapter_model_name)
model.eval()  # Ensure the model is in evaluation mode

# Move to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)


# Example usage to verify loading
def generate_text(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    outputs = model.generate(
        input_ids=inputs.input_ids,
        max_new_tokens=100,
        temperature=0.7,
        top_k=50,
        top_p=0.95,
        eos_token_id=tokenizer.eos_token_id,
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)


# Test generate
print(generate_text("What is a good recommendation for improving math skills?"))
