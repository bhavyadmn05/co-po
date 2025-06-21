"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Shield, User } from "lucide-react"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple admin authentication (replace with real authentication)
    setTimeout(() => {
      // Trim whitespace and check credentials
      const trimmedUsername = username.trim().toLowerCase()
      const trimmedPassword = password.trim()

      if (trimmedUsername === "admin" && trimmedPassword === "admin123") {
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard"
      } else {
        setError(`Invalid credentials. Please use: Username: "admin", Password: "admin123"`)
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Admin Login Card */}
        <Card className="bg-white shadow-xl border-red-200">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Administrator Access</CardTitle>
            <CardDescription className="text-gray-600">Sign in to manage the NBA accreditation portal</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="admin-username" className="text-sm font-medium text-gray-700">
                  Admin Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="admin-username"
                    type="text"
                    placeholder="Enter admin username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-sm font-medium text-gray-700">
                  Admin Password
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter admin password"
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
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In as Admin"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-300">
              <p className="text-sm text-green-800 text-center font-bold mb-2">🔑 DEMO LOGIN CREDENTIALS:</p>
              <div className="text-center space-y-1">
                <p className="text-sm text-green-700">
                  <strong>Username:</strong> <code className="bg-green-100 px-2 py-1 rounded font-mono">admin</code>
                </p>
                <p className="text-sm text-green-700">
                  <strong>Password:</strong> <code className="bg-green-100 px-2 py-1 rounded font-mono">admin123</code>
                </p>
              </div>
              <p className="text-xs text-green-600 text-center mt-2">Copy and paste these exact credentials</p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Administrator Portal • CCET NBA Accreditation System</p>
        </div>
      </div>
    </div>
  )
}
