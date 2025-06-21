"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Users,
  UserPlus,
  LogOut,
  Trash2,
  Edit,
  BookOpen,
  Target,
  Award,
  Settings,
  Plus,
  Save,
} from "lucide-react"

interface User {
  id: number
  username: string
  email: string
  role: "Faculty" | "HOD" | "NBA Coordinator"
  department: "CSE" | "ECE" | "MECH" | "CIVIL"
  status: "active" | "inactive"
  createdAt: string
}

interface Course {
  id: number
  code: string
  name: string
  year: number
  semester: "Fall" | "Spring" | "Summer"
  department: "CSE" | "ECE" | "MECH" | "CIVIL"
  assignedFaculty: string
}

interface ProgramData {
  collegeVision: string
  collegeMission: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users")

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: "john_doe",
      email: "john.doe@ccet.ac.in",
      role: "Faculty",
      department: "CSE",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane.smith@ccet.ac.in",
      role: "HOD",
      department: "ECE",
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      username: "mike_wilson",
      email: "mike.wilson@ccet.ac.in",
      role: "NBA Coordinator",
      department: "MECH",
      status: "active",
      createdAt: "2024-01-05",
    },
  ])

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      code: "CSE301",
      name: "Data Structures and Algorithms",
      year: 3,
      semester: "Fall",
      department: "CSE",
      assignedFaculty: "Dr. John Doe",
    },
    {
      id: 2,
      code: "ECE401",
      name: "Digital Signal Processing",
      year: 4,
      semester: "Fall",
      department: "ECE",
      assignedFaculty: "Dr. Jane Smith",
    },
  ])

  const [programData, setProgramData] = useState<ProgramData>({
    collegeVision:
      "To be a premier institution of higher learning that fosters innovation, excellence, and ethical leadership in engineering and technology.",
    collegeMission:
      "To provide quality education in engineering and technology through innovative teaching methodologies, cutting-edge research, and industry collaboration.",
  })

  const [departmentData, setDepartmentData] = useState({
    cse: {
      peos: [
        "Graduates will be employed in computing or related fields, or will be pursuing advanced degrees in computer science",
        "Graduates will demonstrate technical competence in software development and system design",
        "Graduates will demonstrate effective communication, teamwork, and leadership skills in professional environments",
        "Graduates will engage in lifelong learning and adapt to emerging technologies in computer science",
      ],
    },
    ece: {
      peos: [
        "Graduates will be employed in electronics, communication, or related fields, or pursuing advanced studies",
        "Graduates will demonstrate technical competence in electronics and communication system design",
        "Graduates will demonstrate professional skills including communication, teamwork, and ethical responsibility",
        "Graduates will engage in lifelong learning to adapt to rapidly changing technology in ECE field",
      ],
    },
    mech: {
      peos: [
        "Graduates will be employed in mechanical engineering or related fields, or pursuing higher education",
        "Graduates will demonstrate technical competence in mechanical system design and analysis",
        "Graduates will demonstrate professional skills and ethical responsibility in engineering practice",
        "Graduates will engage in lifelong learning and professional development in mechanical engineering",
      ],
    },
    civil: {
      peos: [
        "Graduates will be employed in civil engineering or related fields, or pursuing advanced degrees",
        "Graduates will demonstrate technical competence in civil engineering design and construction",
        "Graduates will demonstrate professional skills, leadership, and commitment to sustainable development",
        "Graduates will engage in lifelong learning and contribute to the advancement of civil engineering",
      ],
    },
  })

  const addDepartmentPEO = (dept: "cse" | "ece" | "mech" | "civil", value: string) => {
    if (value.trim()) {
      setDepartmentData((prev) => ({
        ...prev,
        [dept]: {
          ...prev[dept],
          peos: [...prev[dept].peos, value.trim()],
        },
      }))
    }
  }

  const removeDepartmentPEO = (dept: "cse" | "ece" | "mech" | "civil", index: number) => {
    setDepartmentData((prev) => ({
      ...prev,
      [dept]: {
        ...prev[dept],
        peos: prev[dept].peos.filter((_, i) => i !== index),
      },
    }))
  }

  const handleSaveDepartmentData = () => {
    setMessage("Department PEOs saved successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  const [showCreateUser, setShowCreateUser] = useState(false)
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "Faculty" as "Faculty" | "HOD" | "NBA Coordinator",
    department: "CSE" as "CSE" | "ECE" | "MECH" | "CIVIL",
  })
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    year: 1,
    semester: "Fall" as "Fall" | "Spring" | "Summer",
    department: "CSE" as "CSE" | "ECE" | "MECH" | "CIVIL",
    assignedFaculty: "",
  })
  const [message, setMessage] = useState("")

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.username || !newUser.email || !newUser.password) {
      setMessage("Please fill in all fields")
      return
    }

    const user: User = {
      id: users.length + 1,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, user])
    setNewUser({ username: "", email: "", password: "", role: "Faculty", department: "CSE" })
    setShowCreateUser(false)
    setMessage(`User "${user.username}" created successfully!`)
    setTimeout(() => setMessage(""), 3000)
  }

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCourse.code || !newCourse.name || !newCourse.assignedFaculty) {
      setMessage("Please fill in all course fields")
      return
    }

    const course: Course = {
      id: courses.length + 1,
      code: newCourse.code,
      name: newCourse.name,
      year: newCourse.year,
      semester: newCourse.semester,
      department: newCourse.department,
      assignedFaculty: newCourse.assignedFaculty,
    }

    setCourses([...courses, course])
    setNewCourse({ code: "", name: "", year: 1, semester: "Fall", department: "CSE", assignedFaculty: "" })
    setShowCreateCourse(false)
    setMessage(`Course "${course.code}" created successfully!`)
    setTimeout(() => setMessage(""), 3000)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
    setMessage("User deleted successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id))
    setMessage("Course deleted successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  const handleSaveProgramData = () => {
    setMessage("Program data saved successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  const addArrayItem = (field: keyof ProgramData, value: string) => {
    if (value.trim()) {
      setProgramData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }))
    }
  }

  const removeArrayItem = (field: keyof ProgramData, index: number) => {
    setProgramData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CCET Admin Dashboard</h1>
                <p className="text-sm text-gray-600">NBA Accreditation Portal Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Administrator
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
        {/* Success/Error Messages */}
        {message && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{message}</AlertDescription>
          </Alert>
        )}

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">NBA Coordinators</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter((u) => u.role === "NBA Coordinator").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Programs</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="program" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Program Management
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Course Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">User Management</CardTitle>
                    <CardDescription>Manage user accounts and assign roles</CardDescription>
                  </div>
                  <Button onClick={() => setShowCreateUser(!showCreateUser)} className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create User
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Create User Form */}
                {showCreateUser && (
                  <Card className="mb-6 bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Create New User</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            placeholder="Enter username"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="Enter email"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            placeholder="Enter password"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <select
                            id="role"
                            value={newUser.role}
                            onChange={(e) =>
                              setNewUser({ ...newUser, role: e.target.value as "Faculty" | "HOD" | "NBA Coordinator" })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Faculty">Faculty</option>
                            <option value="HOD">HOD</option>
                            <option value="NBA Coordinator">NBA Coordinator</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <select
                            id="department"
                            value={newUser.department}
                            onChange={(e) =>
                              setNewUser({ ...newUser, department: e.target.value as "CSE" | "ECE" | "MECH" | "CIVIL" })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="CSE">Computer Science & Engineering</option>
                            <option value="ECE">Electronics & Communication</option>
                            <option value="MECH">Mechanical Engineering</option>
                            <option value="CIVIL">Civil Engineering</option>
                          </select>
                        </div>
                        <div className="md:col-span-2 flex gap-2">
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            Create User
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setShowCreateUser(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-gray-700">Username</th>
                        <th className="text-left p-4 font-medium text-gray-700">Email</th>
                        <th className="text-left p-4 font-medium text-gray-700">Role</th>
                        <th className="text-left p-4 font-medium text-gray-700">Department</th>
                        <th className="text-left p-4 font-medium text-gray-700">Status</th>
                        <th className="text-left p-4 font-medium text-gray-700">Created</th>
                        <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{user.username}</td>
                          <td className="p-4 text-gray-600">{user.email}</td>
                          <td className="p-4">
                            <Badge
                              variant="outline"
                              className={
                                user.role === "HOD"
                                  ? "bg-purple-50 text-purple-700"
                                  : user.role === "NBA Coordinator"
                                    ? "bg-orange-50 text-orange-700"
                                    : "bg-blue-50 text-blue-700"
                              }
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant="outline"
                              className={
                                user.department === "CSE"
                                  ? "bg-blue-50 text-blue-700"
                                  : user.department === "ECE"
                                    ? "bg-green-50 text-green-700"
                                    : user.department === "MECH"
                                      ? "bg-purple-50 text-purple-700"
                                      : "bg-orange-50 text-orange-700"
                              }
                            >
                              {user.department}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={user.status === "active" ? "default" : "secondary"}
                              className={
                                user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-600">{user.createdAt}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Program Management Tab */}
          <TabsContent value="program">
            <div className="space-y-6">
              {/* College Vision & Mission */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    College Vision & Mission
                  </CardTitle>
                  <CardDescription>Define institutional vision & mission statements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="college-vision">College Vision</Label>
                      <Textarea
                        id="college-vision"
                        value={programData.collegeVision}
                        onChange={(e) => setProgramData({ ...programData, collegeVision: e.target.value })}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="college-mission">College Mission</Label>
                      <Textarea
                        id="college-mission"
                        value={programData.collegeMission}
                        onChange={(e) => setProgramData({ ...programData, collegeMission: e.target.value })}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveProgramData} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save College Vision & Mission
                  </Button>
                </CardContent>
              </Card>

              {/* Department Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Management</CardTitle>
                  <CardDescription>Manage departments and their Program Educational Objectives (PEOs)</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="cse" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="cse">Computer Science & Engineering</TabsTrigger>
                      <TabsTrigger value="ece">Electronics & Communication</TabsTrigger>
                      <TabsTrigger value="mech">Mechanical Engineering</TabsTrigger>
                      <TabsTrigger value="civil">Civil Engineering</TabsTrigger>
                    </TabsList>

                    {/* CSE Department */}
                    <TabsContent value="cse">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Computer Science & Engineering - PEOs</CardTitle>
                          <CardDescription>Program Educational Objectives for CSE Department</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {departmentData.cse.peos.map((peo, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                                  CSE PEO {index + 1}:
                                </span>
                                <Input
                                  value={peo}
                                  onChange={(e) => {
                                    const newPeos = [...departmentData.cse.peos]
                                    newPeos[index] = e.target.value
                                    setDepartmentData({
                                      ...departmentData,
                                      cse: { ...departmentData.cse, peos: newPeos },
                                    })
                                  }}
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeDepartmentPEO("cse", index)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add new CSE PEO"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    addDepartmentPEO("cse", e.currentTarget.value)
                                    e.currentTarget.value = ""
                                  }
                                }}
                              />
                              <Button
                                onClick={(e) => {
                                  const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                  addDepartmentPEO("cse", input.value)
                                  input.value = ""
                                }}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* ECE Department */}
                    <TabsContent value="ece">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Electronics & Communication Engineering - PEOs</CardTitle>
                          <CardDescription>Program Educational Objectives for ECE Department</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {departmentData.ece.peos.map((peo, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                                  ECE PEO {index + 1}:
                                </span>
                                <Input
                                  value={peo}
                                  onChange={(e) => {
                                    const newPeos = [...departmentData.ece.peos]
                                    newPeos[index] = e.target.value
                                    setDepartmentData({
                                      ...departmentData,
                                      ece: { ...departmentData.ece, peos: newPeos },
                                    })
                                  }}
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeDepartmentPEO("ece", index)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add new ECE PEO"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    addDepartmentPEO("ece", e.currentTarget.value)
                                    e.currentTarget.value = ""
                                  }
                                }}
                              />
                              <Button
                                onClick={(e) => {
                                  const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                  addDepartmentPEO("ece", input.value)
                                  input.value = ""
                                }}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Mechanical Department */}
                    <TabsContent value="mech">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Mechanical Engineering - PEOs</CardTitle>
                          <CardDescription>Program Educational Objectives for Mechanical Department</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {departmentData.mech.peos.map((peo, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                                  MECH PEO {index + 1}:
                                </span>
                                <Input
                                  value={peo}
                                  onChange={(e) => {
                                    const newPeos = [...departmentData.mech.peos]
                                    newPeos[index] = e.target.value
                                    setDepartmentData({
                                      ...departmentData,
                                      mech: { ...departmentData.mech, peos: newPeos },
                                    })
                                  }}
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeDepartmentPEO("mech", index)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add new Mechanical PEO"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    addDepartmentPEO("mech", e.currentTarget.value)
                                    e.currentTarget.value = ""
                                  }
                                }}
                              />
                              <Button
                                onClick={(e) => {
                                  const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                  addDepartmentPEO("mech", input.value)
                                  input.value = ""
                                }}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Civil Department */}
                    <TabsContent value="civil">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Civil Engineering - PEOs</CardTitle>
                          <CardDescription>Program Educational Objectives for Civil Department</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {departmentData.civil.peos.map((peo, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                                  CIVIL PEO {index + 1}:
                                </span>
                                <Input
                                  value={peo}
                                  onChange={(e) => {
                                    const newPeos = [...departmentData.civil.peos]
                                    newPeos[index] = e.target.value
                                    setDepartmentData({
                                      ...departmentData,
                                      civil: { ...departmentData.civil, peos: newPeos },
                                    })
                                  }}
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeDepartmentPEO("civil", index)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add new Civil PEO"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    addDepartmentPEO("civil", e.currentTarget.value)
                                    e.currentTarget.value = ""
                                  }
                                }}
                              />
                              <Button
                                onClick={(e) => {
                                  const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                  addDepartmentPEO("civil", input.value)
                                  input.value = ""
                                }}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  <Button onClick={handleSaveDepartmentData} className="bg-green-600 hover:bg-green-700 mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Save Department PEOs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Course Management Tab */}
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Course Management</CardTitle>
                    <CardDescription>Manage courses and assign faculty</CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowCreateCourse(!showCreateCourse)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Create Course Form */}
                {showCreateCourse && (
                  <Card className="mb-6 bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Course</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="course-code">Course Code</Label>
                          <Input
                            id="course-code"
                            value={newCourse.code}
                            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                            placeholder="e.g., CSE301"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="course-name">Course Name</Label>
                          <Input
                            id="course-name"
                            value={newCourse.name}
                            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                            placeholder="e.g., Data Structures"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="year">Year</Label>
                          <select
                            id="year"
                            value={newCourse.year}
                            onChange={(e) => setNewCourse({ ...newCourse, year: Number.parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value={1}>1st Year</option>
                            <option value={2}>2nd Year</option>
                            <option value={3}>3rd Year</option>
                            <option value={4}>4th Year</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="semester">Semester</Label>
                          <select
                            id="semester"
                            value={newCourse.semester}
                            onChange={(e) =>
                              setNewCourse({ ...newCourse, semester: e.target.value as "Fall" | "Spring" | "Summer" })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Fall">Fall</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <select
                            id="department"
                            value={newCourse.department}
                            onChange={(e) =>
                              setNewCourse({
                                ...newCourse,
                                department: e.target.value as "CSE" | "ECE" | "MECH" | "CIVIL",
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="CSE">Computer Science & Engineering</option>
                            <option value="ECE">Electronics & Communication</option>
                            <option value="MECH">Mechanical Engineering</option>
                            <option value="CIVIL">Civil Engineering</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="assigned-faculty">Assigned Faculty</Label>
                          <Input
                            id="assigned-faculty"
                            value={newCourse.assignedFaculty}
                            onChange={(e) => setNewCourse({ ...newCourse, assignedFaculty: e.target.value })}
                            placeholder="e.g., Dr. John Doe"
                            required
                          />
                        </div>
                        <div className="md:col-span-2 flex gap-2">
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            Add Course
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setShowCreateCourse(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Courses Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-gray-700">Course Code</th>
                        <th className="text-left p-4 font-medium text-gray-700">Course Name</th>
                        <th className="text-left p-4 font-medium text-gray-700">Year</th>
                        <th className="text-left p-4 font-medium text-gray-700">Semester</th>
                        <th className="text-left p-4 font-medium text-gray-700">Department</th>
                        <th className="text-left p-4 font-medium text-gray-700">Assigned Faculty</th>
                        <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{course.code}</td>
                          <td className="p-4">{course.name}</td>
                          <td className="p-4">
                            <Badge variant="outline" className="bg-gray-50">
                              Year {course.year}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {course.semester}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant="outline"
                              className={
                                course.department === "CSE"
                                  ? "bg-blue-50 text-blue-700"
                                  : course.department === "ECE"
                                    ? "bg-green-50 text-green-700"
                                    : course.department === "MECH"
                                      ? "bg-purple-50 text-purple-700"
                                      : "bg-orange-50 text-orange-700"
                              }
                            >
                              {course.department}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-600">{course.assignedFaculty}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteCourse(course.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  System Settings
                </CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Password Reset</h3>
                    <p className="text-gray-600 mb-4">
                      Reset passwords for users who have forgotten their credentials.
                    </p>
                    <Button variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                      Reset User Passwords
                    </Button>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">System Backup</h3>
                    <p className="text-gray-600 mb-4">Create a backup of all system data and configurations.</p>
                    <Button variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      Create System Backup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
