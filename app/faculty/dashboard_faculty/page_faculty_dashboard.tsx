"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  User,
  FileText,
  Upload,
  BarChart3,
  LogOut,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  Building,
  Lightbulb,
  ArrowRight,
  Users,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface Course {
  id: number
  code: string
  name: string
  year: number
  semester: string
  students: number
  documentsSubmitted: number
  totalDocuments: number
  status: "completed" | "in-progress" | "pending"
}

interface Document {
  id: number
  name: string
  type: string
  uploadDate: string
  status: "approved" | "pending" | "rejected"
}

interface PEOMapping {
  peo: string
  peoText: string
  linkedVM: string
  similarity: number
}

export default function FacultyDashboard() {
  const [selectedCriteria, setSelectedCriteria] = useState<string | null>(null)

  // Add these state variables after the existing useState declarations
  const [stakeholderData, setStakeholderData] = useState([
    { stakeholder: "", method: "", feedback: "", action: "" },
    { stakeholder: "", method: "", feedback: "", action: "" },
    { stakeholder: "", method: "", feedback: "", action: "" },
    { stakeholder: "", method: "", feedback: "", action: "" },
    { stakeholder: "", method: "", feedback: "", action: "" },
  ])

  const [stakeholderTable, setStakeholderTable] = useState<any[]>([])
  const [section2Marks, setSection2Marks] = useState(0)
  const [showStakeholderForm, setShowStakeholderForm] = useState(false)

  // Faculty information - this would come from authentication/database
  const facultyInfo = {
    name: "Dr. John Doe",
    employeeId: "CCET001",
    department: "CSE", // This determines which PEOs to show
    designation: "Assistant Professor",
    email: "john.doe@ccet.ac.in",
    phone: "+91-9876543210",
  }

  // College Vision & Mission (from admin settings)
  const collegeData = {
    vision:
      "To be a premier institution of higher learning that fosters innovation, excellence, and ethical leadership in engineering and technology. We aspire to create globally competent professionals who contribute meaningfully to society and drive technological advancement for the betterment of humanity.",
    mission:
      "To provide quality education in engineering and technology through innovative teaching methodologies, cutting-edge research, and industry collaboration. We are committed to nurturing critical thinking, creativity, and professional ethics while maintaining the highest standards of academic excellence and NBA accreditation requirements.",
  }

  // Department-specific PEOs (would be fetched from admin settings)
  const departmentPEOs = {
    CSE: [
      "Graduates will be employed in computing or related fields, or will be pursuing advanced degrees in computer science",
      "Graduates will demonstrate technical competence in software development and system design",
      "Graduates will demonstrate effective communication, teamwork, and leadership skills in professional environments",
      "Graduates will engage in lifelong learning and adapt to emerging technologies in computer science",
    ],
    ECE: [
      "Graduates will be employed in electronics, communication, or related fields, or pursuing advanced studies",
      "Graduates will demonstrate technical competence in electronics and communication system design",
      "Graduates will demonstrate professional skills including communication, teamwork, and ethical responsibility",
      "Graduates will engage in lifelong learning to adapt to rapidly changing technology in ECE field",
    ],
    MECH: [
      "Graduates will be employed in mechanical engineering or related fields, or pursuing higher education",
      "Graduates will demonstrate technical competence in mechanical system design and analysis",
      "Graduates will demonstrate professional skills and ethical responsibility in engineering practice",
      "Graduates will engage in lifelong learning and professional development in mechanical engineering",
    ],
    CIVIL: [
      "Graduates will be employed in civil engineering or related fields, or pursuing advanced degrees",
      "Graduates will demonstrate technical competence in civil engineering design and construction",
      "Graduates will demonstrate professional skills, leadership, and commitment to sustainable development",
      "Graduates will engage in lifelong learning and contribute to the advancement of civil engineering",
    ],
  }

  // Simulated PEO-Vision/Mission mapping results (would come from AI analysis)
  const peoMappingResults: PEOMapping[] = [
    {
      peo: "PEO1",
      peoText: departmentPEOs[facultyInfo.department as keyof typeof departmentPEOs][0],
      linkedVM: "We aspire to create globally competent professionals who contribute meaningfully to society",
      similarity: 87.5,
    },
    {
      peo: "PEO2",
      peoText: departmentPEOs[facultyInfo.department as keyof typeof departmentPEOs][1],
      linkedVM: "To provide quality education in engineering and technology through innovative teaching methodologies",
      similarity: 82.3,
    },
    {
      peo: "PEO3",
      peoText: departmentPEOs[facultyInfo.department as keyof typeof departmentPEOs][2],
      linkedVM: "We are committed to nurturing critical thinking, creativity, and professional ethics",
      similarity: 79.1,
    },
    {
      peo: "PEO4",
      peoText: departmentPEOs[facultyInfo.department as keyof typeof departmentPEOs][3],
      linkedVM: "drive technological advancement for the betterment of humanity",
      similarity: 85.7,
    },
  ]

  const avgAlignment = Math.round(
    peoMappingResults.reduce((sum, item) => sum + item.similarity, 0) / peoMappingResults.length,
  )

  const getMarksFromAlignment = (alignment: number) => {
    if (alignment >= 75) return 15
    if (alignment >= 60) return 13
    if (alignment >= 50) return 11
    return 8
  }

  const section1Marks = getMarksFromAlignment(avgAlignment)

  // Store marks for further calculations
  const [c1Marks, setC1Marks] = useState({
    section1: section1Marks, // PEO-Vision/Mission alignment
    section2: 0, // Stakeholder feedback
    total: section1Marks, // Will be updated when section2 is completed
  })

  const calculateStakeholderMarks = (stakeholders: any[]) => {
    const validStakeholders = stakeholders.filter((s) => s.stakeholder.trim() && s.method.trim())
    const covered = new Set(validStakeholders.map((s) => s.stakeholder.toLowerCase()))
    const required = new Set(["alumni", "employers", "students", "parents", "faculty"])

    const coveredCount = [...required].filter((req) => [...covered].some((cov) => cov.includes(req))).length

    if (coveredCount === 5) return 15
    if (coveredCount >= 3) return 12
    if (coveredCount >= 1) return 8
    return 5
  }

  const handleStakeholderSubmit = () => {
    const validData = stakeholderData.filter((item) => item.stakeholder.trim() && item.method.trim())

    setStakeholderTable(validData)
    const marks = calculateStakeholderMarks(validData)
    setSection2Marks(marks)

    // Update total C1 marks
    const totalC1 = section1Marks + marks
    setC1Marks({
      section1: section1Marks,
      section2: marks,
      total: totalC1,
    })

    setShowStakeholderForm(false)
  }

  const updateStakeholderData = (index: number, field: string, value: string) => {
    const newData = [...stakeholderData]
    newData[index] = { ...newData[index], [field]: value }
    setStakeholderData(newData)
  }

  const renderC1Content = () => (
    <div className="space-y-8">
      {/* College Vision & Mission */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">College Vision & Mission</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
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

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-green-600" />
                College Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-sm">{collegeData.mission}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Department PEOs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {getDepartmentFullName(facultyInfo.department)} - Program Educational Objectives
        </h3>

        <div className="space-y-3">
          {departmentPEOs[facultyInfo.department as keyof typeof departmentPEOs]?.map((peo, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className={getDepartmentColor(facultyInfo.department)}>
                    {facultyInfo.department} PEO {index + 1}
                  </Badge>
                  <p className="text-gray-700 leading-relaxed text-sm flex-1">{peo}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* PEO-Vision/Mission Mapping Analysis */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">PEO ↔️ Vision/Mission Mapping Analysis</h3>
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-100 text-blue-800">Average Alignment: {avgAlignment}%</Badge>
            <Badge className="bg-green-100 text-green-800">Section 1 Marks: {section1Marks}/15</Badge>
          </div>
        </div>

        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-base">AI-Powered Semantic Analysis Results</CardTitle>
            <CardDescription>
              Using advanced NLP models to analyze alignment between PEOs and institutional Vision/Mission
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PEO
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PEO Text
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Linked Vision/Mission Sentence
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Similarity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {peoMappingResults.map((mapping, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <Badge className={getDepartmentColor(facultyInfo.department)}>{mapping.peo}</Badge>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                        <div className="line-clamp-3">{mapping.peoText}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          <span className="line-clamp-2">{mapping.linkedVM}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
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
          </CardContent>
        </Card>

        {/* Scoring Explanation */}
        <Card className="bg-gray-50">
          <CardContent className="pt-4">
            <h4 className="font-medium text-gray-900 mb-2">NBA Scoring Criteria</h4>
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
      </div>

      {/* NEW: Stakeholder Feedback Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">2️⃣ Stakeholder Feedback on PEOs</h3>
          <div className="flex items-center gap-4">
            {stakeholderTable.length > 0 && (
              <Badge className="bg-green-100 text-green-800">Section 2 Marks: {section2Marks}/15</Badge>
            )}
            <Button
              onClick={() => setShowStakeholderForm(!showStakeholderForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {showStakeholderForm ? "Cancel" : "Add Stakeholder Feedback"}
            </Button>
          </div>
        </div>

        <p className="text-gray-600">
          Fill details below for each stakeholder to calculate marks based on coverage of required stakeholder groups.
        </p>

        {/* Stakeholder Form */}
        {showStakeholderForm && (
          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-base">Stakeholder Feedback Form</CardTitle>
              <CardDescription>
                Add feedback from Alumni, Employers, Students, Parents, and Faculty for maximum marks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {stakeholderData.map((item, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Stakeholder {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`stakeholder-${index}`}>
                          Stakeholder (e.g. Alumni, Employers, Students, Parents, Faculty)
                        </Label>
                        <Input
                          id={`stakeholder-${index}`}
                          value={item.stakeholder}
                          onChange={(e) => updateStakeholderData(index, "stakeholder", e.target.value)}
                          placeholder="Enter stakeholder type"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`method-${index}`}>Method of Feedback</Label>
                        <Input
                          id={`method-${index}`}
                          value={item.method}
                          onChange={(e) => updateStakeholderData(index, "method", e.target.value)}
                          placeholder="E.g. survey, meeting, interview"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`feedback-${index}`}>Feedback / Expectation</Label>
                      <Textarea
                        id={`feedback-${index}`}
                        value={item.feedback}
                        onChange={(e) => updateStakeholderData(index, "feedback", e.target.value)}
                        placeholder="Feedback received from stakeholder..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`action-${index}`}>Action Taken (PEO updated)</Label>
                      <Textarea
                        id={`action-${index}`}
                        value={item.action}
                        onChange={(e) => updateStakeholderData(index, "action", e.target.value)}
                        placeholder="Action taken based on feedback..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-4">
                <Button onClick={handleStakeholderSubmit} className="bg-green-600 hover:bg-green-700">
                  Submit Stakeholder Feedback
                </Button>
                <Button variant="outline" onClick={() => setShowStakeholderForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stakeholder Results Table */}
        {stakeholderTable.length > 0 && (
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-green-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">✅ Stakeholder Feedback Results</CardTitle>
                  <CardDescription>Stakeholder coverage analysis and marks calculation</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">Section 2 Marks: {section2Marks}/15</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stakeholder
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method of Feedback
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feedback
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action Taken
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stakeholderTable.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <Badge className="bg-blue-100 text-blue-800">{row.stakeholder}</Badge>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">{row.method}</td>
                        <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                          <div className="line-clamp-3">{row.feedback}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                          <div className="line-clamp-3">{row.action}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stakeholder Scoring Explanation */}
        <Card className="bg-gray-50">
          <CardContent className="pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Stakeholder Coverage Scoring</h4>
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
      </div>

      {/* C1 Total Marks Summary */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">C1 Criteria - Total Marks Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Section 1 (PEO-VM Alignment):</span>
                  <Badge className="bg-blue-100 text-blue-800">{c1Marks.section1}/15</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Section 2 (Stakeholder Feedback):</span>
                  <Badge className="bg-green-100 text-green-800">{c1Marks.section2}/15</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Total C1 Marks:</span>
                  <Badge className="bg-purple-100 text-purple-800 font-bold">{c1Marks.total}/30</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "in-progress":
        return <Clock className="h-4 w-4 mr-1" />
      case "pending":
        return <AlertCircle className="h-4 w-4 mr-1" />
      case "approved":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 mr-1" />
      default:
        return <AlertCircle className="h-4 w-4 mr-1" />
    }
  }

  const courses: Course[] = [
    {
      id: 1,
      code: "CSE101",
      name: "Introduction to Computer Science",
      year: 2023,
      semester: "Fall",
      students: 60,
      documentsSubmitted: 7,
      totalDocuments: 10,
      status: "in-progress",
    },
    {
      id: 2,
      code: "CSE201",
      name: "Data Structures and Algorithms",
      year: 2023,
      semester: "Spring",
      students: 55,
      documentsSubmitted: 10,
      totalDocuments: 10,
      status: "completed",
    },
    {
      id: 3,
      code: "ECE301",
      name: "Signals and Systems",
      year: 2023,
      semester: "Fall",
      students: 45,
      documentsSubmitted: 5,
      totalDocuments: 10,
      status: "pending",
    },
    {
      id: 4,
      code: "MECH401",
      name: "Thermodynamics",
      year: 2023,
      semester: "Spring",
      students: 40,
      documentsSubmitted: 8,
      totalDocuments: 10,
      status: "in-progress",
    },
  ]

  const documents: Document[] = [
    {
      id: 1,
      name: "Course Syllabus",
      type: "Syllabus",
      uploadDate: "2023-08-15",
      status: "approved",
    },
    {
      id: 2,
      name: "Assessment Plan",
      type: "Plan",
      uploadDate: "2023-08-20",
      status: "pending",
    },
    {
      id: 3,
      name: "Course Outcomes",
      type: "Outcomes",
      uploadDate: "2023-08-25",
      status: "approved",
    },
    {
      id: 4,
      name: "Sample Exam Paper",
      type: "Exam",
      uploadDate: "2023-09-01",
      status: "rejected",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Faculty Dashboard</h1>
                <p className="text-sm text-gray-600">NBA Accreditation Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className={getDepartmentColor(facultyInfo.department)}>
                <Building className="h-3 w-3 mr-1" />
                {facultyInfo.department}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Faculty
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {facultyInfo.name}!</h2>
          <p className="text-gray-600">
            Here's your NBA accreditation progress and activities for {getDepartmentFullName(facultyInfo.department)}.
          </p>
        </div>

        {/* Faculty Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Faculty Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="flex items-center gap-2">
                  <Badge className={getDepartmentColor(facultyInfo.department)}>
                    {getDepartmentFullName(facultyInfo.department)}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Designation</p>
                <p className="text-gray-900">{facultyInfo.designation}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900">{facultyInfo.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-gray-900">{facultyInfo.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">My Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Documents Submitted</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {courses.reduce((sum, course) => sum + course.documentsSubmitted, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {courses.filter((course) => course.status !== "completed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      (courses.filter((course) => course.status === "completed").length / courses.length) * 100,
                    )}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Course Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                My Assigned Courses ({facultyInfo.department})
              </CardTitle>
              <CardDescription>NBA accreditation progress for your assigned courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <Link key={course.id} href={`/faculty/course/${course.id}`}>
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{course.code}</h4>
                          <p className="text-sm text-gray-600">{course.name}</p>
                        </div>
                        <Badge className={getStatusColor(course.status)}>
                          {getStatusIcon(course.status)}
                          <span className="ml-1 capitalize">{course.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-4">
                          <span>Year {course.year}</span>
                          <span>{course.semester}</span>
                          <span>{course.students} students</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Documents Progress</span>
                          <span>
                            {course.documentsSubmitted}/{course.totalDocuments}
                          </span>
                        </div>
                        <Progress value={(course.documentsSubmitted / course.totalDocuments) * 100} className="h-2" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Recent Documents
                  </CardTitle>
                  <CardDescription>Your recently submitted documents</CardDescription>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{doc.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{doc.type}</p>
                        <p className="text-xs text-gray-500">Uploaded: {doc.uploadDate}</p>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {getStatusIcon(doc.status)}
                        <span className="ml-1 capitalize">{doc.status}</span>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts for {facultyInfo.department} faculty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col bg-blue-600 hover:bg-blue-700">
                <Upload className="h-6 w-6 mb-2" />
                Upload Course Document
              </Button>
              <Button className="h-20 flex-col bg-green-600 hover:bg-green-700">
                <BarChart3 className="h-6 w-6 mb-2" />
                View Course Reports
              </Button>
              <Button className="h-20 flex-col bg-purple-600 hover:bg-purple-700">
                <Calendar className="h-6 w-6 mb-2" />
                Schedule Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stakeholder Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Stakeholder Feedback Form
            </CardTitle>
            <CardDescription>Submit stakeholder feedback on PEOs for NBA evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Link href="/faculty/stakeholder-feedback">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Fill Stakeholder Feedback Form
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                Provide feedback from Alumni, Employers, Students, Parents, and Faculty
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
