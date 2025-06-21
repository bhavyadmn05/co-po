"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, ArrowLeft, Users, CheckCircle, Save } from "lucide-react"

interface StakeholderEntry {
  stakeholder: string
  method: string
  feedback: string
  action: string
}

export default function StakeholderFeedbackPage() {
  const [stakeholderData, setStakeholderData] = useState<StakeholderEntry[]>([
    { stakeholder: "", method: "", feedback: "", action: "" },
    { stakeholder: "", method: "", feedback: "", action: "" },
    { stakeholder: "", method: "", feedback: "", action: "" },
    { stakeholder: "", method: "", feedback: "", action: "" },
    { stakeholder: "", method: "", feedback: "", action: "" },
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Faculty information
  const facultyInfo = {
    name: "Dr. John Doe",
    employeeId: "CCET001",
    department: "CSE",
    email: "john.doe@ccet.ac.in",
  }

  const updateStakeholderData = (index: number, field: keyof StakeholderEntry, value: string) => {
    const newData = [...stakeholderData]
    newData[index] = { ...newData[index], [field]: value }
    setStakeholderData(newData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    // Validate that at least one stakeholder entry is filled
    const validEntries = stakeholderData.filter((entry) => entry.stakeholder.trim() && entry.method.trim())

    if (validEntries.length === 0) {
      setMessage("Please fill at least one stakeholder entry with stakeholder type and method.")
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    setTimeout(() => {
      // In real implementation, this would send data to backend
      console.log("Stakeholder feedback submitted:", {
        faculty: facultyInfo,
        stakeholders: validEntries,
        submittedAt: new Date().toISOString(),
      })

      setMessage("Stakeholder feedback submitted successfully! HOD will review your submission.")
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 2000)
  }

  const calculatePotentialMarks = () => {
    const validEntries = stakeholderData.filter((entry) => entry.stakeholder.trim() && entry.method.trim())
    const stakeholderTypes = new Set(validEntries.map((entry) => entry.stakeholder.toLowerCase().trim()))

    const requiredTypes = ["alumni", "employers", "students", "parents", "faculty"]
    const coveredCount = requiredTypes.filter((type) =>
      Array.from(stakeholderTypes).some((covered) => covered.includes(type)),
    ).length

    if (coveredCount === 5) return 15
    if (coveredCount >= 3) return 12
    if (coveredCount >= 1) return 8
    return 5
  }

  const getDepartmentColor = (department: string) => {
    return "bg-blue-100 text-blue-800 border-blue-200"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Stakeholder Feedback Form</h1>
                <p className="text-sm text-gray-600">NBA Criterion 1 - Section 2</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className={getDepartmentColor(facultyInfo.department)}>
                {facultyInfo.department}
              </Badge>
              <Link href="/faculty/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Faculty Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Faculty Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Name</p>
                <p className="text-gray-900">{facultyInfo.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Employee ID</p>
                <p className="text-gray-900">{facultyInfo.employeeId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Department</p>
                <Badge className={getDepartmentColor(facultyInfo.department)}>{facultyInfo.department}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900">{facultyInfo.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2️⃣ Stakeholder Feedback on PEOs</CardTitle>
            <CardDescription>
              Fill details below for each stakeholder → Submit to calculate marks for NBA evaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Fill information for stakeholders: Alumni, Employers, Students, Parents, Faculty</li>
                <li>• At least one stakeholder entry is required</li>
                <li>• More stakeholder types covered = higher NBA marks</li>
                <li>• Your submission will be reviewed by the HOD</li>
              </ul>
            </div>

            {/* Potential Marks Indicator */}
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">Potential NBA Marks:</span>
                <Badge className="bg-green-100 text-green-800">{calculatePotentialMarks()}/15</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success/Error Messages */}
        {message && (
          <Alert className={`mb-6 ${isSubmitted ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
            {isSubmitted && <CheckCircle className="h-4 w-4" />}
            <AlertDescription className={isSubmitted ? "text-green-700" : "text-red-700"}>{message}</AlertDescription>
          </Alert>
        )}

        {/* Stakeholder Form */}
        {!isSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {stakeholderData.map((entry, index) => (
              <Card key={index} className="border-2 border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Stakeholder {index + 1}</CardTitle>
                  <CardDescription>
                    {index === 0 && "e.g., Alumni"}
                    {index === 1 && "e.g., Employers"}
                    {index === 2 && "e.g., Students"}
                    {index === 3 && "e.g., Parents"}
                    {index === 4 && "e.g., Faculty"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`stakeholder-${index}`}>Stakeholder Type *</Label>
                      <Input
                        id={`stakeholder-${index}`}
                        value={entry.stakeholder}
                        onChange={(e) => updateStakeholderData(index, "stakeholder", e.target.value)}
                        placeholder="e.g., Alumni, Employers, Students, Parents, Faculty"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`method-${index}`}>Method of Feedback *</Label>
                      <Input
                        id={`method-${index}`}
                        value={entry.method}
                        onChange={(e) => updateStakeholderData(index, "method", e.target.value)}
                        placeholder="e.g., survey, meeting, interview"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`feedback-${index}`}>Feedback / Expectation</Label>
                    <Textarea
                      id={`feedback-${index}`}
                      value={entry.feedback}
                      onChange={(e) => updateStakeholderData(index, "feedback", e.target.value)}
                      placeholder="Describe the feedback received from this stakeholder..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`action-${index}`}>Action Taken (PEO Updated)</Label>
                    <Textarea
                      id={`action-${index}`}
                      value={entry.action}
                      onChange={(e) => updateStakeholderData(index, "action", e.target.value)}
                      placeholder="Describe actions taken based on the feedback..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Submit Stakeholder Feedback
                  </>
                )}
              </Button>
            </div>

            {/* Scoring Information */}
            <Card className="bg-gray-50">
              <CardContent className="pt-4">
                <h4 className="font-medium text-gray-900 mb-2">NBA Scoring Criteria (Section 2)</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">All 5 Types</Badge>
                    <span className="text-gray-600">15/15 marks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">≥3 Types</Badge>
                    <span className="text-gray-600">12/15 marks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">≥1 Type</Badge>
                    <span className="text-gray-600">8/15 marks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">No Coverage</Badge>
                    <span className="text-gray-600">5/15 marks</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Required stakeholder types: Alumni, Employers, Students, Parents, Faculty
                </p>
              </CardContent>
            </Card>
          </form>
        )}

        {/* Submission Confirmation */}
        {isSubmitted && (
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-green-900 mb-2">Submission Successful!</h3>
                <p className="text-green-700 mb-4">
                  Your stakeholder feedback has been submitted and will be reviewed by the HOD.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/faculty/dashboard">
                    <Button variant="outline">Back to Dashboard</Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setMessage("")
                      setStakeholderData([
                        { stakeholder: "", method: "", feedback: "", action: "" },
                        { stakeholder: "", method: "", feedback: "", action: "" },
                        { stakeholder: "", method: "", feedback: "", action: "" },
                        { stakeholder: "", method: "", feedback: "", action: "" },
                        { stakeholder: "", method: "", feedback: "", action: "" },
                      ])
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Another Form
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
