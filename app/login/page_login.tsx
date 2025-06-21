"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, ArrowLeft, Lock, User } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Authentication for admin, faculty, and HOD
    setTimeout(() => {
      const trimmedUsername = username.trim().toLowerCase()
      const trimmedPassword = password.trim()

      if (trimmedUsername === "admin" && trimmedPassword === "admin123") {
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard"
      } else if (trimmedUsername === "faculty" && trimmedPassword === "faculty123") {
        // Redirect to faculty dashboard
        window.location.href = "/faculty/dashboard"
      } else if (trimmedUsername === "hod" && trimmedPassword === "hod123") {
        // Redirect to HOD dashboard
        window.location.href = "/hod/dashboard"
      } else {
        setError("Invalid credentials. Please check your username and password.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <Card className="bg-white shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">CCET NBA Portal</CardTitle>
            <CardDescription className="text-gray-600">Sign in to access your dashboard</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Button */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-300">
              <p className="text-sm text-green-800 text-center font-bold mb-3">🔑 DEMO LOGIN CREDENTIALS:</p>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-sm text-green-700 font-medium">Administrator Access:</p>
                  <p className="text-xs text-green-600">
                    Username: <code className="bg-green-100 px-1 rounded font-mono">admin</code> | Password:{" "}
                    <code className="bg-green-100 px-1 rounded font-mono">admin123</code>
                  </p>
                </div>
                <div className="border-t border-green-200 pt-2">
                  <div className="text-center">
                    <p className="text-sm text-green-700 font-medium">Faculty Access:</p>
                    <p className="text-xs text-green-600">
                      Username: <code className="bg-green-100 px-1 rounded font-mono">faculty</code> | Password:{" "}
                      <code className="bg-green-100 px-1 rounded font-mono">faculty123</code>
                    </p>
                  </div>
                </div>
                <div className="border-t border-green-200 pt-2">
                  <div className="text-center">
                    <p className="text-sm text-green-700 font-medium">HOD Access:</p>
                    <p className="text-xs text-green-600">
                      Username: <code className="bg-green-100 px-1 rounded font-mono">hod</code> | Password:{" "}
                      <code className="bg-green-100 px-1 rounded font-mono">hod123</code>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-green-600 text-center mt-3">Copy and paste these exact credentials</p>
            </div>

            {/* Info Note */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Note:</strong> The system will automatically redirect you to the appropriate dashboard based on
                your credentials.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Authorized Personnel Only • NBA Accreditation Portal</p>
        </div>
      </div>
    </div>
  )
}
