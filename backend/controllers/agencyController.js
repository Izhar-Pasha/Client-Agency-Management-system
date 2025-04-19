import { AppError } from "../errorHandling/handleErrors.js";
import { Agency } from "../models/AgencyModel.js";
import success from "../errorHandling/handleSuccess.js";

/**
 * Creating a new agency in the database.
 *
 * @route POST /api/agency
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - The agency data from the client
 * @param {String} req.body.Name - Name of the agency
 * @param {String} req.body.Address - Address of the agency
 * @param {Number} req.body.Phone - Contact number of the agency
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {success} 200 - Formatted Success: Agency created successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const CreateAgency = async (req, res, next) => {
  const { Name, Address, Phone } = req.body;
  try {
    if (!Name || !Address || !Phone) {
      console.warn("All fields are required");
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAgency = new Agency({ Name, Address, Phone });

    if (!newAgency) {
      throw next(new AppError("Failed to create agency", 404));
    }
    // console.log("newAgency Created:", newAgency);
    await newAgency.save();

    success(res, "Agency is Successfully created", newAgency, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all agencies from database.
 *
 * @route GET /api/all-agency
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {success} 200 - List of agencies retrieved successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const getAgency = async (req, res, next) => {
  try {
    const AllAgency = await Agency.find();
    if (!AllAgency) {
      throw next(new AppError("Failed to get all agency", 404));
    }

    success(res, "Fetched All Agencies", AllAgency, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get single agency from database.
 *
 * @route GET /api/agency/:id
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {String} req.params.id - Agency ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {success} 200 - single agency retrieved successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const getAgencyById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const AgencyById = await Agency.findById(id);
    if (!AgencyById) {
      throw next(new AppError("Failed to get agency", 404));
    }

    success(res, "Single Agency", AgencyById, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Updating existing agency in the database.
 *
 * @route PUT /api/update-agency/:id
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - The agency data from the client
 * @param {Object} req.params - Route parameters
 * @param {String} req.params.id - Agency ID
 * @param {String} req.body.Name - Name of the agency
 * @param {String} req.body.Address - Address of the agency
 * @param {Number} req.body.Phone - Contact number of the agency
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {success} 200 - Agency Updatation successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const updateAgencyById = async (req, res, next) => {
  const { id } = req.params;
  const { Name, Address, Phone } = req.body;
  try {
    const updatedAgency = await Agency.findByIdAndUpdate(
      id,
      { Name, Address, Phone },
      { new: true }
    );
    if (!updatedAgency) {
      throw next(new AppError("Failed to update agency", 404));
    }

    success(res, "Updated Agency", updatedAgency, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Deleting agency in the database.
 *
 * @route DELETE /api/del-agency/:id
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {String} req.params.id - Agency ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {success} 200 - Agency Deleted successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const deleteAgencyById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteAgency = await Agency.findByIdAndDelete(id);

    if (!deleteAgency) {
      throw next(new AppError("Failed to delete agency", 404));
    }
    success(res, "Deleted Agency", deleteAgency, 200);
  } catch (error) {
    next(error);
  }
};
