package main

import (
	"fmt"
	"log"
	"salesforce/config" 
	"salesforce/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors" 

)

func main() {	
	config.ConnectDB()
	config.InitS3()

	app := fiber.New()

		app.Use(cors.New(cors.Config{
			AllowOrigins: "*",
			AllowMethods: "GET,POST,PUT,DELETE", 
			AllowHeaders: "Origin, Content-Type, Accept, Authorization", 
		}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome to Contract Management API")
	})

	routes.SetupRoutes(app)

	port := ":8082"
	fmt.Println("Server running on http://localhost" + port)
	log.Fatal(app.Listen(port))
}
