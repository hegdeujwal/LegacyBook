import cloudinary from "../../src/lib/cloudinary";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }

  try {
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "legacybook",
    });

    return res.status(200).json({ url: uploadRes.secure_url });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Upload failed", error: err.message });
  }
}
