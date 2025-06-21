"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  GraduationCap,
  Users,
  LogOut,
  BookOpen,
  Target,
  Award,
  Plus,
  Save,
  Trash2,
  Building,
  CheckCircle,
  ArrowRight,
  Calculator,
  Clock,
} from "lucide-react"

interface PEOMapping {
  peo: string
  peoText: string
  linkedVM: string
  similarity: number
}

// Add this component before the main HODDashboard component
function StakeholderReviewSection() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null)
  const [marks, setMarks] = useState<{ [key: number]: number }>({})
  const [message, setMessage] = useState("")

  // Mock faculty submissions data
  const facultySubmissions = [
    {
      id: 1,
      facultyName: "Dr. John Doe",
      employeeId: "CCET001",
      department: "CSE",
      submittedAt: "2024-01-15",
      status: "pending",
      stakeholders: [
        {
          stakeholder: "Alumni",
          method: "Online Survey",
          feedback: "Graduates should have better industry-ready skills and practical knowledge",
          action: "Updated PEO1 to emphasize practical application and industry collaboration",
        },
        {
          stakeholder: "Employers",
          method: "Industry Meeting",
          feedback: "Need stronger communication and teamwork skills in graduates",
          action: "Enhanced PEO3 to include communication and leadership development",
        },
        {
          stakeholder: "Students",
          method: "Focus Group Discussion",
          feedback: "More hands-on projects and real-world problem solving needed",
          action: "Modified PEO2 to include design thinking and problem-solving emphasis",
        },
      ],
    },
    {
      id: 2,
      facultyName: "Dr. Sarah Wilson",
      employeeId: "CCET003",
      department: "CSE",
      submittedAt: "2024-01-18",
      status: "reviewed",
      stakeholders: [
        {
          stakeholder: "Parents",
          method: "Parent-Teacher Meeting",
          feedback: "Ensure graduates are prepared for global job market",
          action: "Updated PEO1 to include global competency and adaptability",
        },
        {
          stakeholder: "Faculty",
          method: "Department Meeting",
          feedback: "Need to align curriculum with emerging technologies",
          action: "Revised PEO4 to emphasize lifelong learning and technology adaptation",
        },
      ],
    },
  ]

  const calculateMarks = (stakeholders: any[]) => {
    const stakeholderTypes = new Set(stakeholders.map((s) => s.stakeholder.toLowerCase().trim()))

    const requiredTypes = ["alumni", "employers", "students", "parents", "faculty"]
    const coveredCount = requiredTypes.filter((type) =>
      Array.from(stakeholderTypes).some((covered) => covered.includes(type)),
    ).length

    if (coveredCount === 5) return 15
    if (coveredCount >= 3) return 12
    if (coveredCount >= 1) return 8
    return 5
  }

  const handleMarkSubmission = (submissionId: number, assignedMarks: number) => {
    setMarks({ ...marks, [submissionId]: assignedMarks })
    setMessage(`Marks assigned successfully for submission ${submissionId}`)
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {message && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-700">{message}</AlertDescription>
        </Alert>
      )}

      {/* Submissions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-xl font-bold text-gray-900">{facultySubmissions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Reviewed</p>
                <p className="text-xl font-bold text-gray-900">
                  {facultySubmissions.filter((s) => s.status === "reviewed" || marks[s.id]).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-xl font-bold text-gray-900">
                  {facultySubmissions.filter((s) => s.status === "pending" && !marks[s.id]).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {facultySubmissions.map((submission) => (
          <Card key={submission.id} className="border-2 border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{submission.facultyName}</CardTitle>
                  <CardDescription>
                    {submission.employeeId} • {submission.department} • Submitted: {submission.submittedAt}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    Suggested: {calculateMarks(submission.stakeholders)}/15
                  </Badge>
                  {marks[submission.id] && (
                    <Badge className="bg-green-100 text-green-800">Assigned: {marks[submission.id]}/15</Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedSubmission(selectedSubmission === submission.id ? null : submission.id)}
                  >
                    {selectedSubmission === submission.id ? "Hide Details" : "View Details"}
                  </Button>
                </div>
              </div>
            </CardHeader>

            {selectedSubmission === submission.id && (
              <CardContent>
                <div className="space-y-4">
                  {/* Stakeholder Details Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-3 py-2 text-left">Stakeholder</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Method</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Feedback</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Action Taken</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submission.stakeholders.map((stakeholder, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2">
                              <Badge className="bg-blue-100 text-blue-800">{stakeholder.stakeholder}</Badge>
                            </td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">{stakeholder.method}</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm max-w-xs">
                              <div className="line-clamp-3">{stakeholder.feedback}</div>
                            </td>
                            <td className="border border-gray-300 px-3 py-2 text-sm max-w-xs">
                              <div className="line-clamp-3">{stakeholder.action}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Marks Assignment */}
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Assign Marks (out of 15)</h4>
                          <p className="text-sm text-gray-600">
                            Suggested: {calculateMarks(submission.stakeholders)}/15 based on stakeholder coverage
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="15"
                            placeholder="Marks"
                            className="w-20"
                            defaultValue={marks[submission.id] || calculateMarks(submission.stakeholders)}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value) || 0
                              if (value >= 0 && value <= 15) {
                                handleMarkSubmission(submission.id, value)
                              }
                            }}
                          />
                          <span className="text-sm text-gray-600">/15</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Department Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Faculty Submissions:</span>
              <span className="ml-2 font-medium">{facultySubmissions.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Average Suggested Marks:</span>
              <span className="ml-2 font-medium">
                {Math.round(
                  facultySubmissions.reduce((sum, s) => sum + calculateMarks(s.stakeholders), 0) /
                    facultySubmissions.length,
                )}
                /15
              </span>
            </div>
            <div>
              <span className="text-gray-600">Review Status:</span>
              <span className="ml-2 font-medium">
                {Object.keys(marks).length}/{facultySubmissions.length} completed
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function HODDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // HOD information - this would come from authentication/database
  const hodInfo = {
    name: "Dr. Jane Smith",
    employeeId: "CCET002",
    department: "CSE", // This determines which PEOs to show
    designation: "Head of Department",
    email: "jane.smith@ccet.ac.in",
    phone: "+91-9876543211",
  }

  // College Vision & Mission (read-only for HOD)
  const collegeData = {
    vision:
      "To be a premier institution of higher learning that fosters innovation, excellence, and ethical leadership in engineering and technology. We aspire to create globally competent professionals who contribute meaningfully to society and drive technological advancement for the betterment of humanity.",
    mission:
      "To provide quality education in engineering and technology through innovative teaching methodologies, cutting-edge research, and industry collaboration. We are committed to nurturing critical thinking, creativity, and professional ethics while maintaining the highest standards of academic excellence and NBA accreditation requirements.",
  }

  // Department PEOs (editable by HOD)
  const [departmentPEOs, setDepartmentPEOs] = useState([
    "Graduates will be employed in computing or related fields, or will be pursuing advanced degrees in computer science",
    "Graduates will demonstrate technical competence in software development and system design",
    "Graduates will demonstrate effective communication, teamwork, and leadership skills in professional environments",
    "Graduates will engage in lifelong learning and adapt to emerging technologies in computer science",
  ])

  // PEO-Vision/Mission mapping states
  const [showPEOMapping, setShowPEOMapping] = useState(false)
  const [isGeneratingMapping, setIsGeneratingMapping] = useState(false)
  const [peoMappingResults, setPeoMappingResults] = useState<PEOMapping[]>([])
  const [avgAlignment, setAvgAlignment] = useState(0)
  const [section1Marks, setSection1Marks] = useState(0)
  const [message, setMessage] = useState("")

  // Department stats
  const departmentStats = {
    totalFaculty: 12,
    totalCourses: 24,
    activeSemesters: 2,
    completedAssessments: 18,
  }

  const addPEO = () => {
    setDepartmentPEOs([...departmentPEOs, ""])
  }

  const updatePEO = (index: number, value: string) => {
    const newPEOs = [...departmentPEOs]
    newPEOs[index] = value
    setDepartmentPEOs(newPEOs)
  }

  const removePEO = (index: number) => {
    const newPEOs = departmentPEOs.filter((_, i) => i !== index)
    setDepartmentPEOs(newPEOs)
  }

  const savePEOs = () => {
    setMessage("Department PEOs saved successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  // Simulate PEO-Vision/Mission mapping using sentence transformers logic
  const generatePEOMapping = () => {
    setIsGeneratingMapping(true)
    setMessage("")

    // Simulate the sentence transformer processing
    setTimeout(() => {
      // Split vision and mission into sentences
      const visionSentences = collegeData.vision.split(/[.!?]+/).filter((s) => s.trim().length > 10)
      const missionSentences = collegeData.mission.split(/[.!?]+/).filter((s) => s.trim().length > 10)
      const allVMSentences = [...visionSentences, ...missionSentences]

      // Simulate similarity calculation for each PEO
      const mappingResults: PEOMapping[] = departmentPEOs.map((peo, index) => {
        // Simulate finding the best matching sentence
        const randomIndex = Math.floor(Math.random() * allVMSentences.length)
        const linkedSentence = allVMSentences[randomIndex].trim()

        // Simulate similarity score (70-95% range for realistic results)
        const similarity = 70 + Math.random() * 25

        return {
          peo: `PEO${index + 1}`,
          peoText: peo,
          linkedVM: linkedSentence,
          similarity: Math.round(similarity * 100) / 100,
        }
      })

      setPeoMappingResults(mappingResults)

      // Calculate average alignment
      const avgAlign = mappingResults.reduce((sum, item) => sum + item.similarity, 0) / mappingResults.length
      setAvgAlignment(Math.round(avgAlign * 100) / 100)

      // Calculate marks based on alignment
      let marks = 0
      if (avgAlign >= 75) marks = 15
      else if (avgAlign >= 60) marks = 13
      else if (avgAlign >= 50) marks = 11
      else marks = 8

      setSection1Marks(marks)
      setShowPEOMapping(true)
      setMessage("PEO-Vision/Mission mapping generated successfully!")
      setIsGeneratingMapping(false)
    }, 3000)
  }

  const getDepartmentFullName = (department: string) => {
    switch (department) {
      case "CSE":
        return "Computer Science and Engineering"
      case "ECE":
        return "Electronics and Communication Engineering"
      case "MECH":
        return "Mechanical Engineering"
      case "CIVIL":
        return "Civil Engineering"
      default:
        return "Unknown Department"
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "CSE":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "ECE":
        return "bg-green-100 text-green-800 border-green-300"
      case "MECH":
        return "bg-red-100 text-red-800 border-red-300"
      case "CIVIL":
        return "bg-orange-100 text-orange-800 border-orange-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 75) return "bg-green-100 text-green-800"
    if (similarity >= 60) return "bg-blue-100 text-blue-800"
    if (similarity >= 50) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">HOD Dashboard</h1>
                <p className="text-sm text-gray-600">NBA Accreditation Portal - Department Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className={getDepartmentColor(hodInfo.department)}>
                <Building className="h-3 w-3 mr-1" />
                {hodInfo.department} - HOD
              </Badge>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {hodInfo.name}!</h2>
          <p className="text-gray-600">
            Manage your department's NBA accreditation activities for {getDepartmentFullName(hodInfo.department)}.
          </p>
        </div>

        {/* Success/Error Messages */}
        {message && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-700">{message}</AlertDescription>
          </Alert>
        )}

        {/* HOD Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              HOD Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Name</p>
                <p className="text-gray-900">{hodInfo.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Employee ID</p>
                <p className="text-gray-900">{hodInfo.employeeId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Department</p>
                <div className="flex items-center gap-2">
                  <Badge className={getDepartmentColor(hodInfo.department)}>
                    {getDepartmentFullName(hodInfo.department)}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Designation</p>
                <p className="text-gray-900">{hodInfo.designation}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900">{hodInfo.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-gray-900">{hodInfo.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Department Faculty</p>
                  <p className="text-2xl font-bold text-gray-900">{departmentStats.totalFaculty}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Department Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{departmentStats.totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Semesters</p>
                  <p className="text-2xl font-bold text-gray-900">{departmentStats.activeSemesters}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Assessments</p>
                  <p className="text-2xl font-bold text-gray-900">{departmentStats.completedAssessments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="peo-management" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              PEO Management
            </TabsTrigger>
            <TabsTrigger value="faculty" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Faculty Management
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* College Vision & Mission (Read-only) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    College Vision & Mission (Read-Only)
                  </CardTitle>
                  <CardDescription>Institutional vision and mission statements set by administration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center">
                          <Target className="h-4 w-4 mr-2 text-blue-600" />
                          College Vision
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed text-sm">{collegeData.vision}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center">
                          <Award className="h-4 w-4 mr-2 text-green-600" />
                          College Mission
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed text-sm">{collegeData.mission}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for department management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      className="h-20 flex-col bg-blue-600 hover:bg-blue-700"
                      onClick={() => setActiveTab("peo-management")}
                    >
                      <Award className="h-6 w-6 mb-2" />
                      Manage PEOs
                    </Button>
                    <Button
                      className="h-20 flex-col bg-green-600 hover:bg-green-700"
                      onClick={() => setActiveTab("faculty")}
                    >
                      <Users className="h-6 w-6 mb-2" />
                      Faculty Management
                    </Button>
                    <Button
                      className="h-20 flex-col bg-purple-600 hover:bg-purple-700"
                      onClick={() => setActiveTab("reports")}
                    >
                      <BookOpen className="h-6 w-6 mb-2" />
                      View Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PEO Management Tab */}
          <TabsContent value="peo-management">
            <div className="space-y-6">
              {/* Department PEOs Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Department PEOs Management
                  </CardTitle>
                  <CardDescription>
                    Edit Program Educational Objectives for {getDepartmentFullName(hodInfo.department)} Department
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {departmentPEOs.map((peo, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-sm font-medium text-gray-600 min-w-[80px] mt-2">
                          {hodInfo.department} PEO {index + 1}:
                        </span>
                        <Textarea
                          value={peo}
                          onChange={(e) => updatePEO(index, e.target.value)}
                          className="flex-1"
                          rows={2}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removePEO(index)}
                          className="text-red-600 mt-2"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}

                    <div className="flex gap-2">
                      <Button onClick={addPEO} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New PEO
                      </Button>
                      <Button onClick={savePEOs} className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 mr-2" />
                        Save PEOs
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PEO-Vision/Mission Mapping */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />🎯 NBA Criteria 1 (50 marks) - PEO Evaluation
                  </CardTitle>
                  <CardDescription>
                    Section 1.3: PEO ↔️ Vision/Mission mapping analysis (15 marks) + Section 1.4: Stakeholder feedback
                    (15 marks)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Uses advanced NLP (Sentence Transformers) to analyze semantic similarity</li>
                      <li>• Maps each PEO to the most relevant Vision/Mission sentence</li>
                      <li>• Calculates alignment scores and NBA marks automatically</li>
                      <li>• Generates comprehensive mapping table for NBA documentation</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={generatePEOMapping}
                      disabled={isGeneratingMapping || departmentPEOs.length === 0}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isGeneratingMapping ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating Mapping...
                        </>
                      ) : (
                        <>
                          <Calculator className="h-4 w-4 mr-2" />
                          Generate PEO ↔️ Vision/Mission Mapping
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Mapping Results */}
                  {showPEOMapping && peoMappingResults.length > 0 && (
                    <Card className="border-2 border-green-200 bg-green-50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />✅ PEO ↔️ Vision/Mission Mapping
                              Results
                            </CardTitle>
                            <CardDescription>AI-powered semantic analysis using Sentence Transformers</CardDescription>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-blue-100 text-blue-800 mb-1">Average Alignment: {avgAlignment}%</Badge>
                            <br />
                            <Badge className="bg-green-100 text-green-800">NBA Marks: {section1Marks}/15</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  PEO
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  PEO Text
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Linked Vision/Mission Sentence
                                </th>
                                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Similarity %
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {peoMappingResults.map((mapping, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-4">
                                    <Badge className={getDepartmentColor(hodInfo.department)}>{mapping.peo}</Badge>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4 text-sm text-gray-700 max-w-xs">
                                    <div className="line-clamp-3">{mapping.peoText}</div>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4 text-sm text-gray-700 max-w-xs">
                                    <div className="flex items-center gap-2">
                                      <ArrowRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                      <span className="line-clamp-2">{mapping.linkedVM}</span>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-4">
                                    <div className="flex items-center gap-2">
                                      <Badge className={getSimilarityColor(mapping.similarity)}>
                                        {mapping.similarity.toFixed(1)}%
                                      </Badge>
                                      <div className="w-16">
                                        <Progress value={mapping.similarity} className="h-2" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Scoring Explanation */}
                        <Card className="bg-gray-50 mt-4">
                          <CardContent className="pt-4">
                            <h4 className="font-medium text-gray-900 mb-2">NBA Scoring Criteria (Section 1.3)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-100 text-green-800">≥75%</Badge>
                                <span className="text-gray-600">15/15 marks</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-blue-100 text-blue-800">≥60%</Badge>
                                <span className="text-gray-600">13/15 marks</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-yellow-100 text-yellow-800">≥50%</Badge>
                                <span className="text-gray-600">11/15 marks</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-red-100 text-red-800">{"<50%"}</Badge>
                                <span className="text-gray-600">8/15 marks</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              {/* Stakeholder Review Section - Part of Criteria 1 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />📋 Section 1.4: Stakeholder Feedback Review (15 marks)
                  </CardTitle>
                  <CardDescription>
                    Review faculty submissions of stakeholder feedback on PEOs for NBA Criteria 1
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StakeholderReviewSection />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Faculty Management Tab */}
          <TabsContent value="faculty">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Faculty Management
                </CardTitle>
                <CardDescription>Manage faculty members in your department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Faculty management features coming soon...</p>
                  <p className="text-sm text-gray-400 mt-2">
                    View faculty profiles, assign courses, and manage department activities
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Department Reports
                </CardTitle>
                <CardDescription>View and generate department-level reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Department reports coming soon...</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Generate NBA reports, faculty performance, and course assessments
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
