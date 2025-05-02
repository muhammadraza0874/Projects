package models

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SLA struct {
	UptimeGuarantee string `json:"uptimeGuarantee"`
	ResponseTime    string `json:"responseTime"`
	PenaltyClause   string `json:"penaltyClause"`
}

type Termination struct {
	EarlyTerminationFee float64 `json:"earlyTerminationFee"`
	NoticePeriodDays    int     `json:"noticePeriodDays"`
}

type Signature struct {
	Signed   bool      `json:"signed"`
	SignedAt time.Time `json:"signedAt"`
	SignedBy string    `json:"signedBy"`
	Method   string    `json:"method"`
}

type Attachment struct {
	Name       string    `json:"name"`
	URL        string    `json:"url"`
	UploadedAt time.Time `json:"uploadedAt"`
}

type Contract struct {
	ID              primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	CustomerID      string             `json:"customerId"`
	IPAddress       string             `json:"ipAddress,omitempty"`
	ContractNumber  string             `json:"contractNumber"`
	Title           string             `json:"title"`
	Status          string             `json:"status"`
	Type            string             `json:"type"`
	Services        []string           `json:"services"`
	StartDate       time.Time          `json:"startDate"`
	EndDate         time.Time          `json:"endDate"`
	AutoRenew       bool               `json:"autoRenew"`
	RenewalTerm     int                `json:"renewalTermMonths"`
	MonthlyRate     float64            `json:"monthlyRate"`
	TotalValue      float64            `json:"totalValue"`
	Currency        string             `json:"currency"`
	BillingCycle    string             `json:"billingCycle"`
	BillingStart    time.Time          `json:"billingStartDate"`
	SLA             SLA                `json:"sla"`
	Termination     Termination        `json:"termination"`
	Signature       Signature          `json:"signature"`
	Attachments     []Attachment       `json:"attachments"`
	Notes           string             `json:"notes"`
	Tags            []string           `json:"tags"`
	CreatedAt       time.Time          `json:"createdAt"`
	UpdatedAt       time.Time          `json:"updatedAt"`
}
