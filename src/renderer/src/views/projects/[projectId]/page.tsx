import { EditModeFlow } from "@renderer/core/modes/edit";

import { ProjectApis } from "@renderer/endpoints/project";
import { Edge, Node } from "@xyflow/react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ProjectPage() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [project, setProject] = useState<{ nodes: Node[]; edges: Edge[] } | null>(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) return;
    ProjectApis.get(projectId)
      .then(({ nodes, edges }) => {
        setProject({ nodes, edges });
        setLoading(false);
      })
      .catch(() => {
        navigate("/projects");
      });
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="animate-spin" size={24} />
        <p className="text-muted-foreground text-sm">{t('project.loading')}</p>
      </div>
    );
  }

  if (!projectId) {
    return <div>{t('project.idMissing', 'Project ID is missing.')}</div>;
  }

  return <EditModeFlow initialNodes={project?.nodes ?? []} initialEdges={project?.edges ?? []} projectId={projectId} />;
}
