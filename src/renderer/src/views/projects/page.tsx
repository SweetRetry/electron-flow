import { Button } from "@renderer/components/ui/button";
import { ProjectApis } from "@renderer/endpoints/project";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CreateProjectDialog } from "./_components/create-project";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Awaited<ReturnType<typeof ProjectApis.getAll>>>([]);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    ProjectApis.getAll().then(setProjects);
  }, []);

  return (
    <section className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("sidebar.projects")}</h2>

        <Button onClick={() => setOpen(true)} className="cursor-pointer" variant="secondary">
          <Plus />
          {t("project.new")}
        </Button>
      </div>

      <ul className="-mx-2 flex flex-wrap">
        {projects.map((project) => (
          <li className="basis-1/4 p-2" key={project.id}>
            <div
              className="hover:bg-secondary cursor-pointer space-y-2 rounded border p-2 transition-colors"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <h3 className="w-full font-semibold">{project.name}</h3>
              <p className="text-muted-foreground text-sm">{project.description}</p>
              <img
                src={project.preview_image}
                alt={project.name}
                className="h-40 w-full rounded-md object-cover"
              />
            </div>
          </li>
        ))}
      </ul>

      <CreateProjectDialog open={open} setOpen={setOpen} />
    </section>
  );
};

export default ProjectsPage;
