"use client";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Project } from "@/lib/projects";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  title?: string;
  description?: string;
}

export function ProjectCard({ project, title, description }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group glass rounded-2xl overflow-hidden shadow-xl hover:shadow-primary/20 border-primary/10 relative"
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="aspect-video w-full overflow-hidden bg-muted relative"
      >
        <Image
          src={project.image}
          alt={title || project.title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <Button variant="secondary" size="sm" className="w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </Button>
        </div>
      </div>
      <CardHeader className="p-6 pb-4 transform-style-3d translate-z-20">
        <CardTitle
          style={{ transform: "translateZ(20px)" }}
          className="line-clamp-1 group-hover:text-primary transition-colors text-xl"
        >
          {title || project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2">
          {description || project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 transform-style-3d translate-z-20">
        <div
          style={{ transform: "translateZ(30px)" }}
          className="flex flex-wrap gap-2"
        >
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-medium text-xs bg-primary/5 hover:bg-primary/10 text-primary border-transparent"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </motion.div>
  );
}
