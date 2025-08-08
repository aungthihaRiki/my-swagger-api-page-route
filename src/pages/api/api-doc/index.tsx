"use client";

import "swagger-ui-react/swagger-ui.css";
import { swaggerSpec } from "@/lib/swagger/swagger";
import SwaggerUI from "swagger-ui-react";
import { useEffect, useState } from "react";
export default async function SwaggerPage() {
  const [spec, setSpec] = useState(null);

  // !session?.user?.role.includes("ADMIN")
  // useEffect(() => {
  //   fetch("/api/swagger")
  //     .then((res) => res.json())
  //     .then((data) => setSpec(data));
  // }, []);

  if (!spec) return <div>Loading Swagger...</div>;

  return (
    <div className="bg-white text-black">
      <SwaggerUI spec={swaggerSpec} />
    </div>
  );
}
