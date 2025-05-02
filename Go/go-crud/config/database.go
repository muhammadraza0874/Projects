package config

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Global MongoDB client and database
var DB *mongo.Database
var client *mongo.Client

// ConnectDB initializes the MongoDB connection
func ConnectDB() {
	mongoURI := "mongodb+srv://muhammadAzeem:3JNqrH8aovZMvwcM@cluster0.kxre6ev.mongodb.net/?retryWrites=true&w=majority"

	clientOptions := options.Client().ApplyURI(mongoURI)

	// ✅ Add timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	fmt.Println("🔄 Connecting to MongoDB...")

	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("MongoDB Connection Error: %v", err)
	}

	// ✅ Ping to verify connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("MongoDB Ping Failed: %v", err)
	}

	// ✅ Assign the database (replace with actual DB name)
	DB = client.Database("salesforce")
	fmt.Println("✅ Connected to MongoDB successfully!")
}

// GetCollection ensures DB is initialized before use
func GetCollection(collectionName string) *mongo.Collection {
	if DB == nil {
		log.Fatal("Database connection is not initialized")
	}
	return DB.Collection(collectionName)
}
