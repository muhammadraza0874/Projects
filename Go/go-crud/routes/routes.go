package routes

import (
	"github.com/gofiber/fiber/v2"
	"salesforce/handlers"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome to Contract Management API")
	})

	app.Post("/contracts", handlers.CreateContract)
	app.Get("/contracts", handlers.GetContracts)
	app.Get("/contracts/:id", handlers.GetContract)
	app.Put("/contracts/:id", handlers.UpdateContract)
	app.Delete("/contracts/:id", handlers.DeleteContract)
	//for aws
	// app.Post("/contracts/upload", handlers.UploadContractFile)
	//for locally
	app.Post("contracts/uploads", handlers.UploadAttachments)


}
