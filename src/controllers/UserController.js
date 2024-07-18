const { Entity } = require("../models/User");
async function Post(req, res) {
	try {
		const { parent_id, name, description, attributes } = req.body;

		// Validate the required fields
		if (!parent_id || !name || !description || !attributes) {
			return res
				.status(400)
				.json({
					error:
						"All fields (parent_id, name, description, attributes) are required",
				});
		}

		const entity = await Entity.create({
			parent_id,
			name,
			description,
			attributes,
		});

		res.status(201).json({ message: "Folder created successfully", entity });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function GetByFolderId(req, res) {
	const folderId = req.params.folderId; // Assuming the parameter is named folderId in the route
	try {
		// Logic to retrieve all folders by the specified folder ID
		const folders = await Entity.findAll({ where: { folder_id: Entity.id } });

		if (folders.length > 0) {
			res.status(200).json({ folders }); // Sending the retrieved folders as a response
		} else {
			res
				.status(404)
				.json({ message: "No folders found for the given folder ID" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message }); // Handling any errors that occur
	}
}

async function Put(req, res) {
	const entityId = req.params.entityId; // Assuming the parameter is named entityId in the route
	const { name, description, attributes } = req.body;

	try {
		let entity = await Entity.findByPk(id);

		if (!entity) {
			return res.status(404).json({ message: "Entity not found" });
		}

		entity.name = name;
		entity.description = description;
		entity.attributes = attributes;

		await entity.save();
		res.status(200).json({ message: "Entity updated successfully", entity });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function Delete(req, res) {
	const entityId = req.params.entityId; // Assuming the parameter is named entityId in the route
	try {
		const entity = await Entity.findByPk(id);

		if (!entity) {
			return res.status(404).json({ message: "Entity not found" });
		}

		await entity.destroy();
		res.status(200).json({ message: "Entity deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	Post,
	GetByFolderId,
	Put,
	Delete,
};
