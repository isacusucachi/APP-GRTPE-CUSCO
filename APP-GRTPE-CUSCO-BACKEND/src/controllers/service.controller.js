import cloudinary from "cloudinary";

import Service from "../models/Service";
import ServiceDetail from "../models/ServiceDetail";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service)
      return res.status(404).json({ err: "Servicio no encontrado" });
    res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newService = new Service({
      title,
      description,
    });
    const serviceSaved = await newService.save();
    res.status(200).json(serviceSaved);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const serviceFound = await Service.findById(req.params.id);
    if (!serviceFound)
      return res.status(404).json({ message: "Servicio no encontrado" });
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(201).json(updatedService);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const foundService = await Service.findById(req.params.id);
    if (!foundService)
      return res.status(404).json({ message: "Servicio no encontrado" });
    await Service.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getServiceDetails = async (req, res) => {
  try {
    const { service_id } = req.params;
    const serviceDetails = await ServiceDetail.find({ serviceID: service_id });
    return res.json(serviceDetails);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getServiceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceDetail = await ServiceDetail.findById(id);
    if (!serviceDetail)
      return res
        .status(404)
        .json({ message: "Detalle de servicio no encontrado" });
    res.status(200).json(serviceDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createServiceDetail = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Por favor suba una imagen de fondo" });
    }
    const { URLLink } = req.body;
    const { service_id } = req.params;
    const serviceFound = await Service.findById(service_id);
    if (serviceFound != null) {
      const result = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = result.secure_url;
      const imgPublic_id = result.public_id;
      const newServiceDetail = new ServiceDetail({
        serviceID: service_id,
        URLLink,
        URLDetail: imageUrl,
        imgPublic_id,
      });

      const serviceDetailSaved = await newServiceDetail.save();

      res.status(200).json(serviceDetailSaved);
    } else {
      res.status(406).json({
        message:
          "El detalle de servicio no se ha guardado. El servicio al que esta intentando asociar no existe",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateServiceDetail = async (req, res) => {
  try {
    const serviceDetailFound = await ServiceDetail.findById(req.params.id);

    if (!serviceDetailFound)
      return res.status(404).json({ message: "Servicio no encontrado" });

    let newImage = {}; // Initialize an empty newImage object

    if (req.file) {
      // If a file (image) was included in the request, proceed with image upload
      await cloudinary.uploader.destroy(serviceDetailFound.imgPublic_id);
      const result = await cloudinary.uploader.upload(req.file.path);
      newImage = {
        URLDetail: result.secure_url,
        imgPublic_id: result.public_id,
      };
    }

    const newServiceDetail = {
      URLLink: req.body.URLLink,
      ...newImage, // Merge the newImage object with other fields if available
    };

    const updatedServiceDetail = await ServiceDetail.findByIdAndUpdate(
      req.params.id,
      { $set: newServiceDetail },
      {
        new: true,
      }
    );
    res.status(201).json(updatedServiceDetail);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteServiceDetail = async (req, res) => {
  try {
    const foundServiceDetail = await ServiceDetail.findById(req.params.id);
    if (!foundServiceDetail)
      return res
        .status(404)
        .json({ message: "Detalle de servicio no encontrado" });
    await cloudinary.uploader.destroy(foundServiceDetail.imgPublic_id);
    await ServiceDetail.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
