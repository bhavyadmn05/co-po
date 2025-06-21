import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Target, Compass } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CCET</h1>
                <p className="text-sm text-gray-600">NBA Accreditation Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CCET NBA Accreditation Portal</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chandigarh College of Engineering and Technology - Your gateway to academic excellence and NBA accreditation
            management
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Vision Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base leading-relaxed">
                To be a premier institution of higher learning that fosters innovation, excellence, and ethical
                leadership in engineering and technology. We aspire to create globally competent professionals who
                contribute meaningfully to society and drive technological advancement for the betterment of humanity.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Mission Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <Compass className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base leading-relaxed">
                To provide quality education in engineering and technology through innovative teaching methodologies,
                cutting-edge research, and industry collaboration. We are committed to nurturing critical thinking,
                creativity, and professional ethics while maintaining the highest standards of academic excellence and
                NBA accreditation requirements.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 Chandigarh College of Engineering and Technology. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2">NBA Accreditation Portal - Authorized Personnel Only</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
