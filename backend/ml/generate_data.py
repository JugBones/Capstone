import pandas as pd

# Define example inputs and templates
subtopics = [
    # Matematika Subtopics
    {"subtopic": "Operasi Dasar", "course": "Matematika"},
    {"subtopic": "Geometri Dasar", "course": "Matematika"},
    {"subtopic": "Trigonometri Dasar", "course": "Matematika"},
    {"subtopic": "Statistika Dasar", "course": "Matematika"},
    {"subtopic": "Peluang dan Probabilitas", "course": "Matematika"},
    {"subtopic": "Kalkulus Dasar", "course": "Matematika"},
    {"subtopic": "Bilangan Kompleks", "course": "Matematika"},
    {"subtopic": "Aljabar Linear", "course": "Matematika"},
    {"subtopic": "Fungsi dan Grafik", "course": "Matematika"},
    {"subtopic": "Logika Matematika", "course": "Matematika"},
    {"subtopic": "Persamaan Diferensial", "course": "Matematika"},
    {"subtopic": "Transformasi Geometri", "course": "Matematika"},
    # Fisika Subtopics
    {"subtopic": "Hukum Newton", "course": "Fisika"},
    {"subtopic": "Energi dan Usaha", "course": "Fisika"},
    {"subtopic": "Kinematika Dasar", "course": "Fisika"},
    {"subtopic": "Dinamika Rotasi", "course": "Fisika"},
    {"subtopic": "Gelombang dan Optik", "course": "Fisika"},
    {"subtopic": "Listrik dan Magnet", "course": "Fisika"},
    {"subtopic": "Termodinamika", "course": "Fisika"},
    {"subtopic": "Fisika Kuantum Dasar", "course": "Fisika"},
    {"subtopic": "Gravitasi dan Relativitas", "course": "Fisika"},
    {"subtopic": "Fluida dan Hidrodinamika", "course": "Fisika"},
    {"subtopic": "Fisika Partikel", "course": "Fisika"},
    {"subtopic": "Energi Nuklir", "course": "Fisika"},
]

improvement_intent = [
    "Tips untuk meningkatkan keterlibatan siswa dalam kelas",
    "Strategi agar siswa lebih aktif selama pembelajaran di kelas",
    "Panduan untuk membantu siswa fokus di kelas",
    "Tips sederhana untuk meningkatkan keaktifan siswa saat belajar",
    "Bagaimana cara meningkatkan perhatian siswa dalam pembelajaran?",
]

query_templates = [
    "Tips bagaimana cara belajar tentang {subtopic} {course}",
    "Artikel tentang {subtopic} {course} untuk pemula",
    "Penjelasan mudah tentang {subtopic} dalam {course}",
    "Bacaan menarik tentang {subtopic} dalam {course}",
    "Strategi belajar efektif untuk memahami {subtopic} {course}",
    "Langkah awal memahami {subtopic} dalam {course}",
    "Panduan belajar {subtopic} untuk siswa {course}",
    "Materi menarik untuk mendalami {subtopic} dalam {course}",
    "Soal dan pembahasan terkait {subtopic} {course}",
    "Video pembelajaran tentang {subtopic} dalam {course}",
    "Cara kreatif untuk belajar {subtopic} di {course}",
    "Kenapa {subtopic} penting dalam {course}?",
    "Praktik sederhana untuk memahami {subtopic} dalam {course}",
    "Latihan terbaik untuk menguasai {subtopic} di {course}",
    "Bagaimana cara mengajarkan {subtopic} di {course} untuk siswa?",
]


# Generate dataset
data = []
for item in subtopics:
    for template in query_templates:
        prompt = template.format(subtopic=item["subtopic"], course=item["course"])
        data.append(
            {
                "User Input": f"Search query for lacking subtopic in \"{item['subtopic']}\" at course {item['course']}",
                "Prompt": prompt,
            }
        )

# Add general improvement intent
data.append(
    {
        "User Input": "Search query for improving child activeness in class",
        "Prompt": improvement_intent,
    }
)

# Save to CSV
dataset = pd.DataFrame(data)
dataset.to_csv("prompt_generation_dataset.csv", index=False)

print("Dataset created and saved as 'prompt_generation_dataset.csv'")
