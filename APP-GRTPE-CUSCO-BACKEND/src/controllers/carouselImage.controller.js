import cloudinary from "cloudinary";
import CarouselImage from "../models/CarouselImage";

export const createCarouselImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Por favor suba una imagen." });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const name = req.file.originalname;
    const imageUrl = result.secure_url;
    const public_id = result.public_id;
    const { URLLink } = req.body;
    const carouselImage = new CarouselImage({
      name,
      URLLink,
      imageUrl,
      public_id,
    });
    const savedCarouselImage = await carouselImage.save();
    res.status(200).json(savedCarouselImage);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCarouselImages = async (req, res) => {
  try {
    const images = await CarouselImage.find();
    res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCarouselImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await CarouselImage.findById(id);
    if (!image) return res.status(404).json({ err: "Imagen no encontrada." });
    res.status(200).json(image);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadCarouselImage = async (req, res) => {
  try {
    const image = await CarouselImage.findById(req.params.id);
    if (!image) return res.status(404).json({ err: "Imagen no encontrada." });
    let newImage = {};
    if (req.file) {
      // If a file (image) was included in the request, proceed with image upload
      await cloudinary.uploader.destroy(image.public_id);
      const result = await cloudinary.uploader.upload(req.file.path);
      newImage = {
        name: req.file.originalname,
        public_id: result.public_id,
        imageUrl: result.secure_url,
      };
    }

    const newCarruselImage = {
      URLLink: req.body.URLLink,
      ...newImage, // Merge the newImage object with other fields if available
    };
    const updatedCarouselImage = await CarouselImage.findByIdAndUpdate(
      req.params.id,
      { $set: newCarruselImage },
      {
        new: true,
      }
    );
    res.status(201).json(updatedCarouselImage);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCarouselImage = async (req, res) => {
  try {
    const image = await CarouselImage.findById(req.params.id);
    if (!image) return res.status(404).json({ err: "Imagen no encontrada." });
    await cloudinary.uploader.destroy(image.public_id);
    await CarouselImage.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
