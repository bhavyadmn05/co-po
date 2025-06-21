"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, ArrowLeft, Upload, FileText, BookOpen, Target, CheckCircle, Download, Eye } from "lucide-react"

interface CourseOutcome {
  id: string
  text: string
  bloomLevel: string
}

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

// Department-wise PSOs (Program Specific Outcomes)
const departmentPSOs = {
  CSE: [
    "Apply computational thinking and programming skills to solve complex problems",
    "Design and develop software systems using modern tools and technologies",
    "Analyze and evaluate computer systems for efficiency and security",
    "Apply knowledge of computer science theory to practical applications",
  ],
  ECE: [
    "Design and analyze electronic circuits and communication systems",
    "Apply signal processing techniques to real-world problems",
    "Develop embedded systems and IoT applications",
    "Analyze electromagnetic fields and wave propagation",
  ],
  MECH: [
    "Design mechanical systems and components using engineering principles",
    "Analyze thermal and fluid systems for optimal performance",
    "Apply manufacturing processes and quality control techniques",
    "Evaluate mechanical systems for sustainability and efficiency",
  ],
  CIVIL: [
    "Design and analyze structural systems for safety and economy",
    "Apply principles of environmental engineering for sustainable development",
    "Plan and manage construction projects effectively",
    "Analyze geotechnical and transportation engineering problems",
  ],
}

// Program Outcomes (POs) - Standard for all departments
const programOutcomes = {
  PO1: "Apply knowledge of mathematics, science, and engineering fundamentals",
  PO2: "Identify, formulate, and analyze complex engineering problems",
  PO3: "Design solutions for complex engineering problems and systems",
  PO4: "Conduct investigations of complex problems using research-based knowledge",
  PO5: "Create, select, and apply appropriate modern engineering tools",
  PO6: "Apply reasoning informed by contextual knowledge to assess societal issues",
  PO7: "Understand the impact of engineering solutions in a global context",
  PO8: "Apply ethical principles and commit to professional ethics",
  PO9: "Function effectively as an individual and in teams",
  PO10: "Communicate effectively on engineering activities",
  PO11: "Demonstrate project management and finance knowledge",
  PO12: "Recognize the need for lifelong learning",
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id

  // Mock course data - in real app, fetch based on courseId
  const course: Course = {
    id: Number(courseId),
    code: "CSE301",
    name: "Data Structures and Algorithms",
    year: 3,
    semester: "Fall 2024",
    students: 45,
    documentsSubmitted: 8,
    totalDocuments: 10,
    status: "in-progress",
  }

  const [subjectName, setSubjectName] = useState(course.name)
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCOs, setGeneratedCOs] = useState<CourseOutcome[]>([])
  const [poMapping, setPOMapping] = useState<any>(null)
  const [psoMapping, setPSOMapping] = useState<any>(null)
  const [accuracyPO, setAccuracyPO] = useState(0)
  const [accuracyPSO, setAccuracyPSO] = useState(0)
  const [message, setMessage] = useState("")
  const [poMappingMatrix, setPOMappingMatrix] = useState<any>(null)
  const [psoMappingMatrix, setPSOMappingMatrix] = useState<any>(null)
  const [showMappingResults, setShowMappingResults] = useState(false)

  // CO Attainment states
  const [attainmentFile, setAttainmentFile] = useState<File | null>(null)
  const [showAttainmentUpload, setShowAttainmentUpload] = useState(false)
  const [isProcessingAttainment, setIsProcessingAttainment] = useState(false)
  const [attainmentData, setAttainmentData] = useState<any[]>([])
  const [poAttainmentTable, setPOAttainmentTable] = useState<any>(null)
  const [psoAttainmentTable, setPSOAttainmentTable] = useState<any>(null)
  const [poAttainmentLevels, setPOAttainmentLevels] = useState<any>(null)
  const [psoAttainmentLevels, setPSOAttainmentLevels] = useState<any>(null)
  const [finalPOAttainment, setFinalPOAttainment] = useState<any>(null)
  const [finalPSOAttainment, setFinalPSOAttainment] = useState<any>(null)
  const [chartData, setChartData] = useState<any>(null)

  // Simulated CO generation results
  const simulatedCOs: CourseOutcome[] = [
    {
      id: "CO1",
      text: "Students will be able to analyze and compare different data structures for efficient storage and retrieval of data",
      bloomLevel: "Analyze (Level 4)",
    },
    {
      id: "CO2",
      text: "Students will be able to design and implement appropriate algorithms for solving computational problems",
      bloomLevel: "Create (Level 6)",
    },
    {
      id: "CO3",
      text: "Students will be able to evaluate the time and space complexity of algorithms and data structures",
      bloomLevel: "Evaluate (Level 5)",
    },
    {
      id: "CO4",
      text: "Students will be able to apply knowledge of data structures and algorithms to solve real-world programming problems",
      bloomLevel: "Apply (Level 3)",
    },
  ]

  // Remove PSO file upload state and handlers
  // const [psoFile, setPsoFile] = useState<File | null>(null)

  // Update the handleFileUpload function to only handle syllabus
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSyllabusFile(file)
    }
  }

  // Update the CO generation to simulate T5 model processing
  const simulateT5COGeneration = (subject: string, syllabusText: string) => {
    // Simulate the T5 model's CO generation with different Bloom levels
    const bloomLevels = ["Apply", "Analyze", "Evaluate", "Create"]

    const generatedCOs = bloomLevels.map((bloomLevel, index) => {
      // Simulate T5 model input: "subject: {subject} syllabus: {syllabus} bloom_level: {bloom_level}"
      let coText = ""

      switch (bloomLevel) {
        case "Apply":
          coText = `Students will be able to apply knowledge of ${subject.toLowerCase()} concepts to solve practical problems`
          break
        case "Analyze":
          coText = `Students will be able to analyze and compare different approaches in ${subject.toLowerCase()}`
          break
        case "Evaluate":
          coText = `Students will be able to evaluate the effectiveness and efficiency of ${subject.toLowerCase()} solutions`
          break
        case "Create":
          coText = `Students will be able to design and create innovative solutions using ${subject.toLowerCase()} principles`
          break
      }

      return {
        id: `CO${index + 1}`,
        text: coText,
        bloomLevel: `${bloomLevel} (Level ${index + 3})`,
      }
    })

    return generatedCOs
  }

  // Update the handleGenerateCOs function
  const handleGenerateCOs = async () => {
    if (!syllabusFile) {
      setMessage("Please upload a syllabus file first.")
      return
    }

    setIsGenerating(true)
    setMessage("")

    // Simulate file processing and T5 model inference
    setTimeout(() => {
      // Simulate extracting text from uploaded file
      const simulatedSyllabusText = `Course content covering ${subjectName} fundamentals, practical applications, and advanced concepts.`

      // Generate COs using simulated T5 model
      const generatedCOs = simulateT5COGeneration(subjectName, simulatedSyllabusText)
      setGeneratedCOs(generatedCOs)

      // Generate CO-PO mapping
      const simulatedPOMatrix = generateSimulatedPOMapping()
      setPOMappingMatrix(simulatedPOMatrix)
      setAccuracyPO(87.5)

      // Generate CO-PSO mapping using department PSOs (no upload needed)
      const simulatedPSOMatrix = generateSimulatedPSOMapping()
      setPSOMappingMatrix(simulatedPSOMatrix)
      setAccuracyPSO(82.3)

      setShowMappingResults(true)
      setMessage("Course Outcomes generated successfully using T5 model!")
      setIsGenerating(false)
    }, 3000)
  }

  const handleAttainmentFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAttainmentFile(file)
    }
  }

  const processAttainmentData = async () => {
    if (!attainmentFile) {
      setMessage("Please upload a CO attainment Excel file first.")
      return
    }

    setIsProcessingAttainment(true)
    setMessage("")

    // Simulate Excel processing and attainment calculations
    setTimeout(() => {
      // Simulate CO attainment data from Excel
      const simulatedAttainmentData = [
        { CO: "CO1", "% Attainment": 85 },
        { CO: "CO2", "% Attainment": 78 },
        { CO: "CO3", "% Attainment": 92 },
        { CO: "CO4", "% Attainment": 88 },
      ]
      setAttainmentData(simulatedAttainmentData)

      // Calculate PO Attainment
      const poAttainmentResults = calculatePOAttainment(simulatedAttainmentData, poMappingMatrix)
      setPOAttainmentTable(poAttainmentResults.table)
      setPOAttainmentLevels(poAttainmentResults.levels)
      setFinalPOAttainment(poAttainmentResults.final)

      // Calculate PSO Attainment
      const psoAttainmentResults = calculatePSOAttainment(simulatedAttainmentData, psoMappingMatrix)
      setPSOAttainmentTable(psoAttainmentResults.table)
      setPSOAttainmentLevels(psoAttainmentResults.levels)
      setFinalPSOAttainment(psoAttainmentResults.final)

      // Generate chart data
      const chartResults = generateChartData(
        simulatedAttainmentData,
        poAttainmentResults.levels,
        psoAttainmentResults.levels,
      )
      setChartData(chartResults)

      setMessage("CO Attainment analysis completed successfully!")
      setIsProcessingAttainment(false)
    }, 2000)
  }

  const calculatePOAttainment = (attainmentData: any[], poMatrix: any) => {
    const cos = ["CO1", "CO2", "CO3", "CO4"]
    const pos = Object.keys(programOutcomes)

    // Initialize final attainment and contribution counts
    const finalPOAttainment: any = {}
    const poContribCounts: any = {}
    pos.forEach((po) => {
      finalPOAttainment[po] = 0
      poContribCounts[po] = 0
    })

    // Calculate attainment table
    const attainmentRows: any = {}

    cos.forEach((co) => {
      attainmentRows[co] = {}
      const coAttainment = attainmentData.find((item) => item.CO === co)
      const coPercent = coAttainment ? coAttainment["% Attainment"] : 0

      pos.forEach((po) => {
        const mappingValue = poMatrix[co][po]
        const contribution = coPercent * (mappingValue / 3)

        if (mappingValue > 0) {
          finalPOAttainment[po] += contribution
          poContribCounts[po] += 1
        }

        attainmentRows[co][po] = Math.round(contribution * 100) / 100
      })
    })

    // Calculate levels
    const avgRow: any = {}
    const scaledRow: any = {}
    const finalRow: any = {}

    pos.forEach((po) => {
      const count = poContribCounts[po]
      const avg = count > 0 ? finalPOAttainment[po] / count : 0
      const scaled = (avg * 3) / 100
      const rounded = Math.round(scaled)

      avgRow[po] = Math.round(avg * 100) / 100
      scaledRow[po] = Math.round(scaled * 100) / 100
      finalRow[po] = rounded
    })

    const levels = {
      "Average %": avgRow,
      "Value * 3 / 100": scaledRow,
      "Final Level (1-3)": finalRow,
    }

    return {
      table: attainmentRows,
      levels: levels,
      final: finalPOAttainment,
    }
  }

  const calculatePSOAttainment = (attainmentData: any[], psoMatrix: any) => {
    const cos = ["CO1", "CO2", "CO3", "CO4"]
    const psos = ["PSO1", "PSO2", "PSO3", "PSO4"]

    // Initialize final attainment and contribution counts
    const finalPSOAttainment: any = {}
    const psoContribCounts: any = {}
    psos.forEach((pso) => {
      finalPSOAttainment[pso] = 0
      psoContribCounts[pso] = 0
    })

    // Calculate attainment table
    const attainmentRows: any = {}

    cos.forEach((co) => {
      attainmentRows[co] = {}
      const coAttainment = attainmentData.find((item) => item.CO === co)
      const coPercent = coAttainment ? coAttainment["% Attainment"] : 0

      psos.forEach((pso) => {
        const mappingValue = psoMatrix[co][pso]
        const contribution = coPercent * (mappingValue / 3)

        if (mappingValue > 0) {
          finalPSOAttainment[pso] += contribution
          psoContribCounts[pso] += 1
        }

        attainmentRows[co][pso] = Math.round(contribution * 100) / 100
      })
    })

    // Calculate levels
    const avgRow: any = {}
    const scaledRow: any = {}
    const finalRow: any = {}

    psos.forEach((pso) => {
      const count = psoContribCounts[pso]
      const avg = count > 0 ? finalPSOAttainment[pso] / count : 0
      const scaled = (avg * 3) / 100
      const rounded = Math.round(scaled)

      avgRow[pso] = Math.round(avg * 100) / 100
      scaledRow[pso] = Math.round(scaled * 100) / 100
      finalRow[pso] = rounded
    })

    const levels = {
      "Average %": avgRow,
      "Value * 3 / 100": scaledRow,
      "Final Level (1-3)": finalRow,
    }

    return {
      table: attainmentRows,
      levels: levels,
      final: finalPSOAttainment,
    }
  }

  const generateChartData = (coData: any[], poLevels: any, psoLevels: any) => {
    return {
      coAttainment: coData.map((item) => ({
        name: item.CO,
        value: item["% Attainment"],
      })),
      poAttainment: Object.entries(poLevels["Final Level (1-3)"]).map(([po, level]) => ({
        name: po,
        value: level as number,
      })),
      psoAttainment: Object.entries(psoLevels["Final Level (1-3)"]).map(([pso, level]) => ({
        name: pso,
        value: level as number,
      })),
    }
  }

  // Show attainment upload after mapping is complete
  React.useEffect(() => {
    if (showMappingResults && poMappingMatrix && psoMappingMatrix) {
      setShowAttainmentUpload(true)
    }
  }, [showMappingResults, poMappingMatrix, psoMappingMatrix])

  const getBloomLevelColor = (level: string) => {
    if (level.includes("Create") || level.includes("Level 6")) return "bg-red-100 text-red-800"
    if (level.includes("Evaluate") || level.includes("Level 5")) return "bg-orange-100 text-orange-800"
    if (level.includes("Analyze") || level.includes("Level 4")) return "bg-yellow-100 text-yellow-800"
    if (level.includes("Apply") || level.includes("Level 3")) return "bg-green-100 text-green-800"
    if (level.includes("Understand") || level.includes("Level 2")) return "bg-blue-100 text-blue-800"
    return "bg-purple-100 text-purple-800"
  }

  const getDepartmentColor = (dept: string) => {
    return "bg-blue-100 text-blue-800 border-blue-200"
  }

  const generateSimulatedPOMapping = () => {
    const cos = ["CO1", "CO2", "CO3", "CO4"]
    const pos = Object.keys(programOutcomes)

    // Simulated mapping matrix with strength values (0-3)
    const matrix: any = {}
    cos.forEach((co) => {
      matrix[co] = {}
      pos.forEach((po) => {
        // Generate random mapping strength (0-3) with higher probability for non-zero values
        const rand = Math.random()
        if (rand > 0.7) matrix[co][po] = 3
        else if (rand > 0.5) matrix[co][po] = 2
        else if (rand > 0.3) matrix[co][po] = 1
        else matrix[co][po] = 0
      })
    })

    return matrix
  }

  const generateSimulatedPSOMapping = () => {
    const cos = ["CO1", "CO2", "CO3", "CO4"]
    const psos = departmentPSOs.CSE // Use CSE PSOs for demo

    const matrix: any = {}
    cos.forEach((co) => {
      matrix[co] = {}
      psos.forEach((pso, index) => {
        const psoKey = `PSO${index + 1}`
        // Generate random mapping strength
        const rand = Math.random()
        if (rand > 0.6) matrix[co][psoKey] = 3
        else if (rand > 0.4) matrix[co][psoKey] = 2
        else if (rand > 0.2) matrix[co][psoKey] = 1
        else matrix[co][psoKey] = 0
      })
    })

    return matrix
  }

  const getMappingStrengthColor = (value: number) => {
    switch (value) {
      case 3:
        return "bg-green-600 text-white"
      case 2:
        return "bg-yellow-500 text-white"
      case 1:
        return "bg-blue-500 text-white"
      case 0:
        return "bg-gray-200 text-gray-600"
      default:
        return "bg-gray-200 text-gray-600"
    }
  }

  const getMappingStrengthLabel = (value: number) => {
    switch (value) {
      case 3:
        return "Strong"
      case 2:
        return "Medium"
      case 1:
        return "Weak"
      case 0:
        return "None"
      default:
        return "None"
    }
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
                <h1 className="text-xl font-bold text-gray-900">Course Management</h1>
                <p className="text-sm text-gray-600">
                  {course.code} - {course.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className={getDepartmentColor("CSE")}>
                CSE
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Course Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Course Code</p>
                <p className="text-gray-900 font-medium">{course.code}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Course Name</p>
                <p className="text-gray-900">{course.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Academic Details</p>
                <p className="text-gray-900">
                  Year {course.year} • {course.semester}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Enrolled Students</p>
                <p className="text-gray-900">{course.students} students</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-600">Documentation Progress</span>
                <span className="text-gray-900">
                  {course.documentsSubmitted}/{course.totalDocuments} completed
                </span>
              </div>
              <Progress value={(course.documentsSubmitted / course.totalDocuments) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Course Outcome Generator */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />📘 Course Outcome Generator
            </CardTitle>
            <CardDescription>
              Upload your syllabus to automatically generate Course Outcomes (COs) using our trained T5 transformer
              model
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subject Name Input */}
            <div className="space-y-2">
              <Label htmlFor="subject-name">Subject Name</Label>
              <Input
                id="subject-name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Enter Subject Name"
                required
              />
            </div>

            {/* File Upload Section - Only Syllabus */}
            <div className="space-y-2">
              <Label htmlFor="syllabus-file">Upload Syllabus (PDF/DOCX) *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <div className="space-y-2">
                  <input
                    id="syllabus-file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="syllabus-file"
                    className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Click to upload syllabus
                  </label>
                  <p className="text-xs text-gray-500">PDF, DOC, or DOCX files only</p>
                  {syllabusFile && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">{syllabusFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <Button
                onClick={handleGenerateCOs}
                disabled={!syllabusFile || isGenerating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating COs...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Generate COs & Mapping
                  </>
                )}
              </Button>
            </div>

            {/* Success/Error Messages */}
            {message && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-700">{message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Generated Course Outcomes */}
        {generatedCOs.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Generated Course Outcomes
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                AI-generated Course Outcomes based on your syllabus, mapped to Bloom's Taxonomy levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedCOs.map((co, index) => (
                  <Card key={co.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              {co.id}
                            </Badge>
                            <Badge className={getBloomLevelColor(co.bloomLevel)}>{co.bloomLevel}</Badge>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{co.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mapping Accuracy */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-800">PO Mapping Accuracy</p>
                        <p className="text-2xl font-bold text-blue-900">{accuracyPO}%</p>
                      </div>
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                {/* Always show PSO mapping since PSOs are department-specific */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">PSO Mapping Accuracy</p>
                        <p className="text-2xl font-bold text-green-900">{accuracyPSO}%</p>
                      </div>
                      <Target className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CO-PO and CO-PSO Mapping Matrices */}
        {showMappingResults && poMappingMatrix && (
          <div className="space-y-8 mb-8">
            {/* CO-PO Mapping Matrix */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />📊 CO-PO Mapping Matrix
                </CardTitle>
                <CardDescription>
                  <strong>Mapping Accuracy:</strong> {accuracyPO.toFixed(2)}% | Strength: 3=Strong, 2=Medium, 1=Weak,
                  0=None
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">CO / PO</th>
                        {Object.keys(programOutcomes).map((po) => (
                          <th
                            key={po}
                            className="border border-gray-300 px-3 py-2 text-center font-medium min-w-[60px]"
                          >
                            {po}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(poMappingMatrix).map((co) => (
                        <tr key={co} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-medium bg-blue-50">{co}</td>
                          {Object.keys(programOutcomes).map((po) => (
                            <td key={po} className="border border-gray-300 px-3 py-2 text-center">
                              <div
                                className={`inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium ${getMappingStrengthColor(poMappingMatrix[co][po])}`}
                              >
                                {poMappingMatrix[co][po]}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                    <span>3 - Strong Mapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>2 - Medium Mapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>1 - Weak Mapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span>0 - No Mapping</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CO-PSO Mapping Matrix */}
            {psoMappingMatrix && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />📊 CO-PSO Mapping Matrix
                  </CardTitle>
                  <CardDescription>
                    <strong>Mapping Accuracy:</strong> {accuracyPSO.toFixed(2)}% | Program Specific Outcomes for CSE
                    Department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-3 py-2 text-left font-medium">CO / PSO</th>
                          {departmentPSOs.CSE.map((_, index) => (
                            <th
                              key={index}
                              className="border border-gray-300 px-3 py-2 text-center font-medium min-w-[60px]"
                            >
                              PSO{index + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(psoMappingMatrix).map((co) => (
                          <tr key={co} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2 font-medium bg-green-50">{co}</td>
                            {departmentPSOs.CSE.map((_, index) => {
                              const psoKey = `PSO${index + 1}`
                              return (
                                <td key={psoKey} className="border border-gray-300 px-3 py-2 text-center">
                                  <div
                                    className={`inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium ${getMappingStrengthColor(psoMappingMatrix[co][psoKey])}`}
                                  >
                                    {psoMappingMatrix[co][psoKey]}
                                  </div>
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* PSO Descriptions */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Program Specific Outcomes (PSOs) - CSE Department:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {departmentPSOs.CSE.map((pso, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                          <Badge variant="outline" className="bg-green-100 text-green-800 mt-0.5">
                            PSO{index + 1}
                          </Badge>
                          <p className="text-sm text-gray-700 flex-1">{pso}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* CO Attainment Upload Section */}
        {showAttainmentUpload && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-purple-600" />📊 CO Attainment Analysis
              </CardTitle>
              <CardDescription>
                Upload Excel file with CO attainment percentages to calculate PO and PSO attainment levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="attainment-file">Upload CO Attainment Excel File (XLSX/XLS) *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="space-y-2">
                    <input
                      id="attainment-file"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleAttainmentFileUpload}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="attainment-file"
                      className="cursor-pointer text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Click to upload CO attainment file
                    </label>
                    <p className="text-xs text-gray-500">Excel files with columns: CO, % Attainment</p>
                    {attainmentFile && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">{attainmentFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Process Button */}
              <div className="flex gap-4">
                <Button
                  onClick={processAttainmentData}
                  disabled={!attainmentFile || isProcessingAttainment}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isProcessingAttainment ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Attainment...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Calculate PO & PSO Attainment
                    </>
                  )}
                </Button>
              </div>

              {/* Sample Format Info */}
              <Card className="bg-gray-50">
                <CardContent className="pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Expected Excel Format:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2">CO</th>
                          <th className="border border-gray-300 px-3 py-2">% Attainment</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">CO1</td>
                          <td className="border border-gray-300 px-3 py-2">85</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">CO2</td>
                          <td className="border border-gray-300 px-3 py-2">78</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">CO3</td>
                          <td className="border border-gray-300 px-3 py-2">92</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">CO4</td>
                          <td className="border border-gray-300 px-3 py-2">88</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )}

        {/* CO vs PO Attainment Table */}
        {poAttainmentTable && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />✅ CO vs PO Attainment Table
              </CardTitle>
              <CardDescription>Calculated attainment values for each CO-PO combination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-3 py-2 text-left font-medium">CO / PO</th>
                      {Object.keys(programOutcomes).map((po) => (
                        <th key={po} className="border border-gray-300 px-3 py-2 text-center font-medium min-w-[60px]">
                          {po}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(poAttainmentTable).map((co) => (
                      <tr key={co} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-medium bg-blue-50">{co}</td>
                        {Object.keys(programOutcomes).map((po) => (
                          <td key={po} className="border border-gray-300 px-3 py-2 text-center">
                            {poAttainmentTable[co][po]}%
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CO vs PSO Attainment Table */}
        {psoAttainmentTable && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />✅ CO vs PSO Attainment Table
              </CardTitle>
              <CardDescription>Calculated attainment values for each CO-PSO combination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-3 py-2 text-left font-medium">CO / PSO</th>
                      {departmentPSOs.CSE.map((_, index) => (
                        <th
                          key={index}
                          className="border border-gray-300 px-3 py-2 text-center font-medium min-w-[60px]"
                        >
                          PSO{index + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(psoAttainmentTable).map((co) => (
                      <tr key={co} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-medium bg-green-50">{co}</td>
                        {departmentPSOs.CSE.map((_, index) => {
                          const psoKey = `PSO${index + 1}`
                          return (
                            <td key={psoKey} className="border border-gray-300 px-3 py-2 text-center">
                              {psoAttainmentTable[co][psoKey]}%
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PO Attainment Levels */}
        {poAttainmentLevels && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">🎯 PO Attainment Levels (Final)</CardTitle>
              <CardDescription>Final calculated PO attainment levels with averaging and scaling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-3 py-2 text-left font-medium">Level / PO</th>
                      {Object.keys(programOutcomes).map((po) => (
                        <th key={po} className="border border-gray-300 px-3 py-2 text-center font-medium">
                          {po}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(poAttainmentLevels).map((level) => (
                      <tr key={level} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-medium bg-blue-50">{level}</td>
                        {Object.keys(programOutcomes).map((po) => (
                          <td key={po} className="border border-gray-300 px-3 py-2 text-center">
                            {level === "Final Level (1-3)" ? (
                              <Badge
                                className={`${poAttainmentLevels[level][po] >= 2 ? "bg-green-100 text-green-800" : poAttainmentLevels[level][po] >= 1 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                              >
                                {poAttainmentLevels[level][po]}
                              </Badge>
                            ) : (
                              poAttainmentLevels[level][po]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PSO Attainment Levels */}
        {psoAttainmentLevels && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">🎯 PSO Attainment Levels (Final)</CardTitle>
              <CardDescription>Final calculated PSO attainment levels with averaging and scaling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-3 py-2 text-left font-medium">Level / PSO</th>
                      {departmentPSOs.CSE.map((_, index) => (
                        <th key={index} className="border border-gray-300 px-3 py-2 text-center font-medium">
                          PSO{index + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(psoAttainmentLevels).map((level) => (
                      <tr key={level} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-medium bg-green-50">{level}</td>
                        {departmentPSOs.CSE.map((_, index) => {
                          const psoKey = `PSO${index + 1}`
                          return (
                            <td key={psoKey} className="border border-gray-300 px-3 py-2 text-center">
                              {level === "Final Level (1-3)" ? (
                                <Badge
                                  className={`${psoAttainmentLevels[level][psoKey] >= 2 ? "bg-green-100 text-green-800" : psoAttainmentLevels[level][psoKey] >= 1 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                                >
                                  {psoAttainmentLevels[level][psoKey]}
                                </Badge>
                              ) : (
                                psoAttainmentLevels[level][psoKey]
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts Section */}
        {chartData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* CO Attainment Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 CO Attainment Chart</CardTitle>
                <CardDescription>Course Outcome attainment percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-center space-x-4 bg-gray-50 rounded-lg p-4">
                  {chartData.coAttainment.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative flex items-end">
                        <div
                          className="bg-blue-600 rounded-t-md transition-all duration-700 ease-out flex items-end justify-center text-white text-xs font-medium min-w-[40px]"
                          style={{
                            height: `${(item.value / 100) * 200}px`,
                            minHeight: "20px",
                          }}
                        >
                          <span className="mb-1">{item.value}%</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium mt-2 text-gray-700">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">Y-axis: Attainment Percentage (0-100%)</p>
                </div>
              </CardContent>
            </Card>

            {/* PO Attainment Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 PO Attainment Chart</CardTitle>
                <CardDescription>Program Outcome attainment levels (0-3 scale)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-center space-x-2 bg-gray-50 rounded-lg p-4 overflow-x-auto">
                  {chartData.poAttainment.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center min-w-[30px]">
                      <div className="relative flex items-end">
                        <div
                          className={`rounded-t-md transition-all duration-700 ease-out flex items-end justify-center text-white text-xs font-medium ${
                            item.value >= 2 ? "bg-green-600" : item.value >= 1 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{
                            height: `${(item.value / 3) * 200}px`,
                            minHeight: "20px",
                            width: "25px",
                          }}
                        >
                          <span className="mb-1 transform rotate-90 origin-center text-[10px]">{item.value}</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium mt-2 text-gray-700 transform -rotate-45 origin-center">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">Y-axis: Attainment Level (0-3)</p>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-600 rounded"></div>
                      <span className="text-xs">≥2 (Good)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span className="text-xs">≥1 (Fair)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-xs">&lt;1 (Poor)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PSO Attainment Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 PSO Attainment Chart</CardTitle>
                <CardDescription>Program Specific Outcome attainment levels (0-3 scale)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-center space-x-6 bg-gray-50 rounded-lg p-4">
                  {chartData.psoAttainment.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative flex items-end">
                        <div
                          className={`rounded-t-md transition-all duration-700 ease-out flex items-end justify-center text-white text-xs font-medium ${
                            item.value >= 2 ? "bg-green-600" : item.value >= 1 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{
                            height: `${(item.value / 3) * 200}px`,
                            minHeight: "20px",
                            width: "40px",
                          }}
                        >
                          <span className="mb-1">{item.value}</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium mt-2 text-gray-700">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">Y-axis: Attainment Level (0-3)</p>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-600 rounded"></div>
                      <span className="text-xs">≥2 (Good)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span className="text-xs">≥1 (Fair)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-xs">&lt;1 (Poor)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Course Actions</CardTitle>
            <CardDescription>Additional actions for {course.code}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 flex-col bg-green-600 hover:bg-green-700">
                <Upload className="h-5 w-5 mb-1" />
                Upload Documents
              </Button>
              <Button className="h-16 flex-col bg-purple-600 hover:bg-purple-700">
                <FileText className="h-5 w-5 mb-1" />
                View Reports
              </Button>
              <Button className="h-16 flex-col bg-orange-600 hover:bg-orange-700">
                <Target className="h-5 w-5 mb-1" />
                Assessment Tools
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
