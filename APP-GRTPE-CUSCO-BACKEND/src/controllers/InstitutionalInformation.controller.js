import cloudinary from "cloudinary";
import InstitutionalInformation from "../models/InstitutionalInformation";

export const createInstitutionalInformation = async (req, res) => {
  try {
    const { title, iconUrl, urlLink } = req.body;
    const institutionalInformation = new InstitutionalInformation({
      title,
      iconUrl,
      urlLink,
    });
    const savedInstitutionalInformation = await institutionalInformation.save();
    res.status(200).json(savedInstitutionalInformation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getInstitutionalInformations = async (req, res) => {
  try {
    const institutionalInformations = await InstitutionalInformation.find();
    res.status(200).json(institutionalInformations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getInstitutionalInformation = async (req, res) => {
  const { id } = req.params;
  try {
    const institutionalInformation = await InstitutionalInformation.findById(
      id
    );
    if (!institutionalInformation)
      return res
        .status(404)
        .json({ err: "Información institucional no encontrada." });
    res.status(200).json(institutionalInformation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadInstitutionalInformation = async (req, res) => {
  try {
    const institutionalInformation = await InstitutionalInformation.findById(
      req.params.id
    );
    if (!institutionalInformation)
      return res
        .status(404)
        .json({ err: "Información institucional no encontrada." });
    const updatedInstitutionalInformation =
      await InstitutionalInformation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(201).json(updatedInstitutionalInformation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteInstitutionalInformation = async (req, res) => {
  try {
    const foundInstitutionalInformation =
      await InstitutionalInformation.findById(req.params.id);
    if (!foundInstitutionalInformation)
      return res
        .status(404)
        .json({ message: "Información institucional no encontrada." });
    await InstitutionalInformation.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
