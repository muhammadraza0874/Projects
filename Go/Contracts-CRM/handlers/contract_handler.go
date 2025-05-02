package handlers

import (
	"os"
	"context"
	"log"
	"time" 
	"net/http"
	"salesforce/models" 
	"salesforce/config"
	"salesforce/services"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetContracts(c *fiber.Ctx) error {
	collection := config.GetCollection("contracts")

	var contracts []bson.M
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Println("Error fetching contracts:", err)
		return c.Status(http.StatusInternalServerError).SendString("Failed to fetch contracts")
	}
	defer cursor.Close(context.Background())

	if err := cursor.All(context.Background(), &contracts); err != nil {
		log.Println("Error decoding contracts:", err)
		return c.Status(http.StatusInternalServerError).SendString("Failed to decode contracts")
	}

	return c.JSON(contracts)
}

func GetContract(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid contract ID")
	}

	collection := config.GetCollection("contracts")
	var contract bson.M
	err = collection.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&contract)
	if err != nil {
		return c.Status(http.StatusNotFound).SendString("Contract not found")
	}

	return c.JSON(contract)
}

func CreateContract(c *fiber.Ctx) error {
	collection := config.GetCollection("contracts")

	var contract models.Contract

	if err := c.BodyParser(&contract); err != nil {
		log.Println("Invalid request payload:", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	contract.ID = primitive.NewObjectID()
	contract.CreatedAt = time.Now()
	contract.UpdatedAt = time.Now()

	result, err := collection.InsertOne(context.Background(), contract)
	if err != nil {
		log.Println("Failed to insert contract:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create contract"})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"message": "Contract created successfully",
		"id":      result.InsertedID,
	})
}

func UpdateContract(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid contract ID")
	}

	collection := config.GetCollection("contracts")

	var update bson.M
	if err := c.BodyParser(&update); err != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid request payload")
	}

	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": objID}, bson.M{"$set": update})
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Failed to update contract")
	}

	return c.JSON(fiber.Map{"message": "Contract updated successfully"})
}

func DeleteContract(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid contract ID")
	}

	collection := config.GetCollection("contracts")
	_, err = collection.DeleteOne(context.Background(), bson.M{"_id": objID})
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Failed to delete contract")
	}

	return c.JSON(fiber.Map{"message": "Contract deleted successfully"})
}

func UploadAttachments(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		log.Println("Failed to parse multipart form:", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Failed to parse files"})
	}
	log.Println("formform-->", form)

	files := form.File["attachments"]
	if len(files) == 0 {
		log.Println("No files uploaded")
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "No files uploaded"})
	}
	log.Printf("Received %d file(s)", len(files))

	localDirectory := "./uploads/"

	log.Printf("Checking if the local directory '%s' exists", localDirectory)
	if err := os.MkdirAll(localDirectory, os.ModePerm); err != nil {
		log.Println("Failed to create directory:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create directory"})
	}
	log.Printf("Directory '%s' is ready", localDirectory)

	var fileURLs []string

	for _, fileHeader := range files {
		log.Printf("Processing file: %s", fileHeader.Filename)

		localFilePath := localDirectory + fileHeader.Filename
		log.Printf("Saving file to: %s", localFilePath)
		if err := c.SaveFile(fileHeader, localFilePath); err != nil {
			log.Println("Failed to save file:", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save file"})
		}
		log.Printf("File '%s' saved successfully", fileHeader.Filename)

		fileURL := "/uploads/" + fileHeader.Filename
		log.Printf("Generated file URL: %s", fileURL)
		fileURLs = append(fileURLs, fileURL)
	}

	log.Printf("Returning %d file URL(s)", len(fileURLs))
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Files uploaded successfully",
		"urls":    fileURLs,
	})
}


func UploadContractFile(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	if err != nil {
		log.Println("Failed to get file:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid file"})
	}

	src, err := file.Open()
	if err != nil {
		log.Println("Failed to open file:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not open file"})
	}
	defer src.Close()

	fileURL, err := services.UploadFileToS3(src, file.Filename)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to upload file"})
	}

	return c.JSON(fiber.Map{"message": "File uploaded successfully", "file_url": fileURL})
}
