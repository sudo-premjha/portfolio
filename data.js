window.PORTFOLIO_DATA = {
  "personal": {
    "name": "Prem Jha",
    "title": "DevOps & Cloud Infrastructure Engineer",
    "titleAlternates": ["Kubernetes Architect", "Cloud Engineer", "DevSecOps Engineer", "Platform Engineer", "Site Reliability Engineer"],
    "location": "New Delhi, India",
    "email": "premjha.shanker@gmail.com",
    "phone": "+91 88518 53442",
    "linkedin": "https://linkedin.com/in/prem-shanker-jha",
    "github": "https://github.com/gigglebytes-devops",
    "summary": "Results-driven DevOps Engineer with 5 years of experience designing and optimizing cloud-native infrastructure across AWS, Azure, and GCP. Delivered $65K+ in annual cost savings, orchestrated large-scale Kubernetes migrations for 50+ microservices, and built enterprise-grade CI/CD pipelines serving mission-critical workloads. Deep expertise in infrastructure automation, DevSecOps, AI/ML infrastructure, and high-availability distributed systems achieving 99.9%+ uptime.",
    "availability": "Open to Opportunities"
  },
  "stats": [
    { "value": 65, "suffix": "K+", "prefix": "$", "label": "Annual Cost Savings", "icon": "💰" },
    { "value": 50, "suffix": "+", "prefix": "", "label": "Microservices Migrated", "icon": "🚀" },
    { "value": 99.9, "suffix": "%", "prefix": "", "label": "System Uptime", "icon": "⚡" },
    { "value": 5, "suffix": "+", "prefix": "", "label": "Years Experience", "icon": "🏆" }
  ],
  "skills": {
    "Cloud Platforms": ["AWS EKS", "AWS EC2", "AWS S3", "AWS Lambda", "AWS Bedrock", "Azure AKS", "Azure ML Studio", "GCP GKE", "GCP Compute Engine", "VMware vSphere"],
    "Containerization & Orchestration": ["Kubernetes", "Docker", "Helm", "Istio", "Calico", "Kong Gateway", "RKE2", "Tanzu", "Ingress Controllers"],
    "Infrastructure as Code": ["Terraform", "Pulumi", "CloudFormation", "Azure ARM Templates", "Crossplane", "Ansible"],
    "CI/CD & GitOps": ["Jenkins", "GitHub Actions", "ArgoCD", "Spinnaker", "Azure DevOps", "AWS CodeBuild", "AWS CodeDeploy"],
    "Monitoring & Observability": ["Prometheus", "Grafana", "OpenSearch", "ELK Stack", "Loki", "Jaeger", "Fluentd", "Logstash", "PagerDuty"],
    "Security & Secrets": ["HashiCorp Vault", "AWS Secrets Manager", "Azure Key Vault", "Trivy", "Veracode", "OpenLDAP", "CIS Benchmarks", "Qualys"],
    "AI/ML Infrastructure": ["AWS Bedrock", "AWS Knowledge Bases", "OpenSearch Vector Search", "S3 Vector", "RAG Implementation", "Azure ML Studio"],
    "Databases & Messaging": ["MySQL", "PostgreSQL", "MongoDB", "YugabyteDB", "Redis", "Kafka"],
    "Scripting & Automation": ["Python", "Bash", "PowerShell", "YAML", "JSON"],
    "Networking & CDN": ["Fastly CDN", "Signal Sciences WAF", "F5 Firewall", "Varnish", "Cloudflare", "AWS ALB/NLB", "VPC Design"]
  },
  "experience": [
    {
      "company": "Material",
      "role": "DevOps Engineer",
      "location": "New Delhi, India",
      "period": "July 2024 – Present",
      "type": "Full-time",
      "current": true,
      "highlights": [
        "Drove multi-cloud (AWS/GCP) infrastructure optimization achieving <strong>30% cost reduction ($20K annually)</strong> via strategic resource rightsizing and automated backup policies.",
        "Led migration of <strong>50+ microservices</strong> to EKS/RKE2 clusters, improving API response times by 50% through Kong Gateway, Varnish caching, and service mesh implementation.",
        "Boosted EKS network performance by 30% through advanced ALB/NLB ingress controllers and strategic VPC segmentation.",
        "Established centralized observability stack (OpenSearch, Prometheus, Grafana, Logstash) with PagerDuty/Slack alerting, reducing <strong>MTTR by 65%</strong>.",
        "Eliminated hardcoded credential exposure across all environments by implementing HashiCorp Vault and AWS Secrets Manager.",
        "Designed cross-cloud disaster recovery architecture using AWS Backup Vaults and active-passive failover across AWS and Azure.",
        "Standardized CI/CD pipelines using Jenkins and Spinnaker with Helm charts, ensuring consistent and auditable deployments.",
        "Executed Azure DevOps migration via REST APIs with zero CI/CD disruption.",
        "Implemented Fastly CDN with Signal Sciences WAF, protecting against OWASP vulnerabilities and DDoS attacks.",
        "Architected AI/ML infrastructure on AWS Bedrock for model deployment and RAG using AWS Knowledge Bases and OpenSearch vector search."
      ]
    },
    {
      "company": "Manikaran Power Ltd",
      "role": "Freelance DevOps Engineer",
      "location": "Remote",
      "period": "March 2024 – June 2024",
      "type": "Freelance",
      "current": false,
      "highlights": [
        "Engineered and optimized Jenkins/Portainer CI/CD pipelines for <strong>20+ containerized applications</strong>, increasing release frequency by 35%.",
        "Automated infrastructure management for on-premises Linux/Windows servers using Ansible playbooks.",
        "Achieved 99.9% availability for critical microservices through Kubernetes pod anti-affinity rules and dynamic cluster autoscaling.",
        "Implemented Kafka-based event streaming architecture, reducing workflow latency by <strong>40%</strong> for real-time analytics."
      ]
    },
    {
      "company": "Tata Consultancy Services (TCS)",
      "role": "Systems Engineer",
      "location": "Remote",
      "period": "August 2021 – March 2024",
      "type": "Full-time",
      "current": false,
      "highlights": [
        "Automated CI/CD pipelines for <strong>15+ microservices</strong> using Azure DevOps and Jenkins on AKS, achieving 40% faster deployments and 70% reduction in deployment errors.",
        "Deployed and managed large-scale ML models on Azure ML Studio with automated scaling, monitoring, and model versioning.",
        "Implemented API security and traffic management using Azure API Management, Kong Gateway, and F5 Firewall.",
        "Delivered full platform automation using Terraform and Azure ARM Templates, eliminating manual deployment errors.",
        "Deployed Prometheus/Grafana monitoring stack, significantly reducing outages during peak traffic periods.",
        "Architected air-gapped Kubernetes environment using RKE2 for maximum security compliance."
      ]
    }
  ],
  "projects": [
    {
      "name": "Media Streaming Platform",
      "tag": "AWS / GCP Multi-Cloud",
      "description": "Production-grade multi-cloud streaming infrastructure with global CDN, full observability, and cross-cloud disaster recovery.",
      "highlights": [
        "Designed production-grade EKS clusters with full Helm and Terraform automation; deployed Fastly CDN with Signal Sciences WAF for global delivery and real-time DDoS/OWASP protection.",
        "Established centralized observability (OpenSearch, Prometheus, Grafana, Fluentd) and cross-cloud backup strategy between AWS and GCP.",
        "Led cost-optimization initiative migrating managed databases to self-managed instances in non-production environments."
      ],
      "tech": ["AWS EKS", "Terraform", "Helm", "Fastly CDN", "Signal Sciences WAF", "Prometheus", "Grafana", "GCP"]
    },
    {
      "name": "Land Registration Authority",
      "tag": "VMware Air-Gapped",
      "description": "Secure, air-gapped multi-cluster Kubernetes platform for a government land registration authority with zero internet exposure.",
      "highlights": [
        "Architected production-grade, multi-cluster RKE2 Kubernetes platform on VMware vSphere in a fully air-gapped, high-security environment.",
        "Engineered a Shared Services cluster with full toolchain: Jenkins, ArgoCD (GitOps), Harbor, and HashiCorp Vault.",
        "Integrated RKE2 with vSphere CPI & CSI for dynamic persistent storage; deployed full-stack observability (Prometheus, Grafana, Loki)."
      ],
      "tech": ["RKE2", "VMware vSphere", "ArgoCD", "HashiCorp Vault", "Harbor", "Prometheus", "Loki", "Jenkins"]
    },
    {
      "name": "Container Terminal Operations",
      "tag": "AWS",
      "description": "High-availability container terminal operations platform with enterprise security, compliance automation, and policy-driven backups.",
      "highlights": [
        "Built high-availability EKS cluster with Terraform, implementing autoscaling and a scalable multi-application architecture with single ALB ingress.",
        "Enforced Kubernetes CIS Benchmarks, integrated Qualys for vulnerability management, and configured Velero for policy-driven backups to AWS S3 and Azure Blob."
      ],
      "tech": ["AWS EKS", "Terraform", "Velero", "Qualys", "Prometheus", "Grafana", "AWS ALB", "CIS Benchmarks"]
    },
    {
      "name": "Global Dental Care Platform",
      "tag": "Azure Multi-Region",
      "description": "Enterprise-grade Azure platform serving dental care operations across 3 continents with 100% automated deployments.",
      "highlights": [
        "Architected air-gapped Azure AKS environment with Application Gateway, Front Door, and Firewall; implemented MySQL Flexible Server with geo-replicated disaster recovery.",
        "Managed certificates and secrets via Azure Key Vault with automated rotation; created Azure Automation Runbooks achieving 100% automated deployments across 3 continents."
      ],
      "tech": ["Azure AKS", "Azure Front Door", "Azure Key Vault", "MySQL Flexible Server", "Terraform", "Helm", "Trivy"]
    }
  ],
  "certifications": [
    {
      "name": "Microsoft Certified: Azure Virtual Desktop Specialty",
      "code": "AZ-140",
      "issuer": "Microsoft",
      "earned": "August 2023",
      "verifyUrl": "https://learn.microsoft.com/en-us/users/premjha/credentials/5267ABEFADDFBC46"
    },
    {
      "name": "Couchbase Associate Architect",
      "code": "",
      "issuer": "Couchbase",
      "earned": "",
      "verifyUrl": "https://www.credly.com/badges/c553c092-7a2c-436e-835c-725a9a157eaa/public_url"
    }
  ],
  "education": [
    {
      "institution": "Maharishi Dayanand University",
      "degree": "Bachelor of Technology — Computer Science & Engineering",
      "period": "2017 – 2021",
      "coursework": "Cloud Computing, Distributed Systems, Network Security"
    }
  ]
};
