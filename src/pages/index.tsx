import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans flex flex-col items-center justify-items-center min-h-screen py-10`}
    >
      <div className="">
        <div className="w-full max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              API Documentation
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed">
              This page can only use API with Swagger documentation
            </p>

            {/* Description */}
            <p className="text-lg text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed">
              To interact with our API endpoints and explore available
              functionality, please access our comprehensive Swagger
              documentation interface.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex justify-center mb-8">
            <button              
              data-testid="button-swagger-redirect"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:-translate-y-1 transition-all duration-200 group border-0 h-auto"
            >
              <Link className="mr-3" href={"/swagger"}>
              Access Swagger Documentation
              </Link>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              For technical support or API questions, please contact our
              development team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
