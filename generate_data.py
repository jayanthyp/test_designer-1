import requests
import os
import csv

# Create the images directory if it doesn't exist
image_dir = "images"
if not os.path.exists(image_dir):
    os.makedirs(image_dir)

# List of sample image URLs
sample_images = [
    ("Abstract", "https://picsum.photos/seed/abstract/800/600", "Colorful abstract design"),
    ("Mountain", "https://picsum.photos/seed/mountain/800/600", "Majestic mountain range"),
    ("Beach", "https://picsum.photos/seed/beach/800/600", "Sunny beach scene"),
    ("Forest", "https://picsum.photos/seed/forest/800/600", "Tranquil forest path"),
    ("Desert", "https://picsum.photos/seed/desert/800/600", "Vast desert landscape"),
    ("Coast", "https://picsum.photos/seed/coast/800/600", "Beautiful coastal view"),
]

csv_data = [["image_name", "path", "description"]]

print(f"Downloading {len(sample_images)} images...")

for i, (name, url, description) in enumerate(sample_images):
    try:
        # Get final redirected URL to ensure image content is downloaded
        response = requests.get(url, stream=True, allow_redirects=True)
        response.raise_for_status()

        # Use .jpg as default extension for picsum
        extension = '.jpg'

        # Create a safe filename
        safe_name = "".join([c if c.isalnum() else "_" for c in name])
        image_filename = f"{safe_name}_{i+1}{extension}"
        image_path_local = os.path.join(image_dir, image_filename)

        # Write image content to local file
        with open(image_path_local, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        # Add row to CSV
        csv_data.append([
            image_filename,
            os.path.join(".", image_dir, image_filename).replace(os.sep, "/"),
            description
        ])

        print(f"✅ Downloaded: {image_filename}")

    except Exception as e:
        print(f"❌ Failed to download {url}: {e}")

# Write the CSV file
csv_filename = "data.csv"
with open(csv_filename, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerows(csv_data)

print(f"\nCSV file generated: {csv_filename}")
print(f"Images saved in: ./{image_dir}/")


#printhellow world