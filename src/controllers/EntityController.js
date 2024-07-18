const { logger } = require("winston");
const { Entity } = require("../models/Entity");


async function Post(req, res) {
	try {
	  const { parent_id, name, description, attributes } = req.body;
  
	  // Validate the required fields
	  if (!parent_id || !name || !description || !attributes) {
		logger.warn("Validation failed for creating entity", { parent_id, name, description, attributes });
		return res.status(400).json({
		  error: "All fields (parent_id, name, description, attributes) are required",
		});
	  }
  
	  const entity = await Entity.create({
		parent_id,
		name,
		description,
		attributes,
	  });
	  logger.info("Entity created successfully", { entity });
	  res.status(201).json({ message: "Folder created successfully", entity });
	} catch (error) {
	  logger.error("Error creating entity", { error: error.message });
	  res.status(500).json({ error: error.message });
	}
  }
  
  async function GetByFolderId(req, res) {
	const folderId = req.params.folderId; // Assuming the parameter is named folderId in the route
	try {
	  // Logic to retrieve all folders by the specified folder ID
	  const folders = await Entity.findAll({ where: { folder_id: folderId } });
  
	  if (folders.length > 0) {
		logger.info("Folders retrieved successfully", { folderId, folders });
		res.status(200).json({ folders }); // Sending the retrieved folders as a response
	  } else {
		logger.warn("No folders found for the given folder ID", { folderId });
		res.status(404).json({ message: "No folders found for the given folder ID" });
	  }
	} catch (error) {
	  logger.error("Error retrieving folders", { error: error.message });
	  res.status(500).json({ error: error.message }); // Handling any errors that occur
	}
  }
  
  async function GetAllFolders(req, res) {
	try {
	  // Logic to retrieve all folders
	  const folders = await Entity.findAll();
  
	  if (folders.length > 0) {
		logger.info("All folders retrieved successfully", { folders });
		res.status(200).json({ folders }); // Sending the retrieved folders as a response
	  } else {
		logger.warn("No folders found");
		res.status(404).json({ message: "No folders found" });
	  }
	} catch (error) {
	  logger.error("Error retrieving all folders", { error: error.message });
	  res.status(500).json({ error: error.message }); // Handling any errors that occur
	}
  }
  
  async function Put(req, res) {
	const entityId = req.params.entityId; // Assuming the parameter is named entityId in the route
	const { name, description, attributes } = req.body;
  
	try {
	  let entity = await Entity.findByPk(entityId);
  
	  if (!entity) {
		logger.warn("Entity not found", { entityId });
		return res.status(404).json({ message: "Entity not found" });
	  }
  
	  entity.name = name;
	  entity.description = description;
	  entity.attributes = attributes;
  
	  await entity.save();
	  logger.info("Entity updated successfully", { entity });
	  res.status(200).json({ message: "Entity updated successfully", entity });
	} catch (error) {
	  logger.error("Error updating entity", { error: error.message });
	  res.status(500).json({ error: error.message });
	}
  }
  
  async function Delete(req, res) {
	const entityId = req.params.entityId; // Assuming the parameter is named entityId in the route
	try {
	  const entity = await Entity.findByPk(entityId);
  
	  if (!entity) {
		logger.warn("Entity not found", { entityId });
		return res.status(404).json({ message: "Entity not found" });
	  }
  
	  await entity.destroy();
	  logger.info("Entity deleted successfully", { entityId });
	  res.status(200).json({ message: "Entity deleted successfully" });
	} catch (error) {
	  logger.error("Error deleting entity", { error: error.message });
	  res.status(500).json({ error: error.message });
	}
  }
  
  module.exports = {
	Post,
	GetByFolderId,
	Put,
	Delete,
	GetAllFolders
  };
  