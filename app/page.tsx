"use client";
// components
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// sections
import Hero from "./hero";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <OutImpressiveStats />
      <CoursesCategories />
      <ExploreCourses />
      <Testimonial />
      <Events />
      <StudentsFeedback />
      <TrustedCompany /> */}
      <Footer />
    </>
  );
}
