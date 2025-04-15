import { AppError } from "../errorHandling/handleErrors.js";
import { Client } from "../models/ClientModel.js";
import success from "../errorHandling/handleSuccess.js";

/**
 * Creating a new client in the database.
 *
 * @route POST /api/client
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - The agency data from the client
 * @param {String} req.body.Name - Name of the client
 * @param {String} req.body.Email - Email of the client
 * @param {Number} req.body.Phone - Contact number of the client
 * @param {String} req.body.TotalBill - Total Bill of the client
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Object} 200 - Agency created successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const createClient = async (req, res, next) => {
  const { Name, Email, Phone, TotalBill, Agency } = req.body;

  try {
    if (!Name || !Email || !Phone || !TotalBill || !Agency) {
      console.warn("All fields are required");
      return res.status(400).json({ message: "All fields are required" });
    }

    const newClient = new Client({ Name, Email, Phone, TotalBill, Agency });

    await newClient.save();

    success(res, "Client is Successfully created", newClient, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all clients from database.
 *
 * @route GET /api/all-client
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Object} 200 - List of clients retrieved successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const getClient = async (req, res, next) => {
  try {
    const getClients = await Client.find().populate("Agency", "_id Name");

    if (getClients.length === 0) {
      return next(new AppError("No clients found", 404));
    }

    success(res, "Fetched All clients", getClients, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get single client from database.
 *
 * @route GET /api/client/:id
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {String} req.params.id - Client ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Object} 200 - single client retrieved successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const getClientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getClient = await Client.findById(id).populate("Agency", "_id Name");

    if (!getClient) {
      return next(new AppError("Failed to get Client", 404));
    }

    success(res, "Single Client", getClient, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Updating existing client in the database.
 *
 * @route PUT /api/update-client/:id
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - The client data from the client
 * @param {Object} req.params - Route parameters
 * @param {String} req.params.id - Client ID
 * @param {String} req.body.Name - Name of the client
 * @param {String} req.body.Email - Email of the client
 * @param {Number} req.body.Phone - Contact number of the client
 * @param {String} req.body.TotalBill - Total Bill of the client
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Object} 200 - client Updatation successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const updateClientById = async (req, res, next) => {
  const { id } = req.params;
  const { Name, Email, Phone, TotalBill } = req.body;
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { Name, Email, Phone, TotalBill },
      { new: true }
    );

    if (!updatedClient) {
      return next(new AppError("Failed to update the client", 404));
    }

    success(res, "Updated Client", updatedClient, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Deleting client in the database.
 *
 * @route DELETE /api/del-client/:id
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {String} req.params.id - Client ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Object} 200 - Client Deleted successfully
 * @throws {AppError} 400 - Missing required fields or DB failure
 */

export const deleteClientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteClient = await Client.findByIdAndDelete(id);

    if (!deleteClient) {
      return next(new AppError("Failed to delete the client", 404));
    }

    success(res, "Deleted Client", deleteClient, 200);
  } catch (error) {
    next(error);
  }
};
