import { BlogPost, DiagramConfig } from "@/types/blog";

const aiopsMlopsNodes = [
  { id: '1', type: 'input', data: { label: 'Code Commit' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'CI Pipeline' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'Build & Test' }, position: { x: 250, y: 200 } },
  { id: '4', data: { label: 'Artifact Registry' }, position: { x: 250, y: 300 } },
  { id: '5', data: { label: 'CD Pipeline' }, position: { x: 250, y: 400 } },
  { id: '6', data: { label: 'Staging' }, position: { x: 100, y: 500 } },
  { id: '7', data: { label: 'Production' }, position: { x: 400, y: 500 } },
  { id: '8', data: { label: 'Monitoring' }, position: { x: 250, y: 600 } },
  { id: '9', data: { label: 'Alerting' }, position: { x: 100, y: 700 } },
  { id: '10', data: { label: 'AI Analysis' }, position: { x: 400, y: 700 } },
  { id: '11', type: 'output', data: { label: 'Auto-Remediation' }, position: { x: 250, y: 800 } },
];

const aiopsMlopsEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e5-7', source: '5', target: '7', animated: true },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e8-10', source: '8', target: '10', animated: true },
  { id: 'e10-11', source: '10', target: '11', animated: true },
];

const mlopsLifecycleNodes = [
  { id: '1', type: 'input', data: { label: 'Data Collection' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Data Processing' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'Feature Engineering' }, position: { x: 250, y: 200 } },
  { id: '4', data: { label: 'Model Training' }, position: { x: 250, y: 300 } },
  { id: '5', data: { label: 'Model Evaluation' }, position: { x: 250, y: 400 } },
  { id: '6', data: { label: 'Model Registry' }, position: { x: 250, y: 500 } },
  { id: '7', data: { label: 'Model Deployment' }, position: { x: 250, y: 600 } },
  { id: '8', data: { label: 'Monitoring' }, position: { x: 250, y: 700 } },
  { id: '9', type: 'output', data: { label: 'Feedback Loop' }, position: { x: 250, y: 800 } },
];

const mlopsLifecycleEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e7-8', source: '7', target: '8', animated: true },
  { id: 'e8-9', source: '8', target: '9', animated: true },
  { id: 'e9-1', source: '9', target: '1', animated: true },
];

const gitOpsNodes = [
  { id: '1', type: 'input', data: { label: 'Developer (Push Code)' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Git Repository (Source of Truth)' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'CI Pipeline (Test & Build)' }, position: { x: 250, y: 200 } },
  { id: '4', data: { label: 'Container Registry' }, position: { x: 250, y: 300 } },
  { id: '5', data: { label: 'Update Manifests (Git)' }, position: { x: 250, y: 400 } },
  { id: '6', data: { label: 'GitOps Controller (Sync)' }, position: { x: 250, y: 500 } },
  { id: '7', data: { label: 'Kubernetes Cluster' }, position: { x: 250, y: 600 } },
  { id: '8', type: 'output', data: { label: 'Production Environment' }, position: { x: 250, y: 700 } },
];

const gitOpsEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e7-8', source: '7', target: '8', animated: true },
];

// Intelligent Automation Pipeline Diagram
const intelligentOpsNodes = [
  { id: '1', type: 'input', data: { label: 'Metrics & Logs' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Data Aggregation' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'AI/ML Engine' }, position: { x: 250, y: 200 } },
  { id: '4', data: { label: 'Anomaly Detection' }, position: { x: 100, y: 300 } },
  { id: '5', data: { label: 'Predictive Analysis' }, position: { x: 400, y: 300 } },
  { id: '6', data: { label: 'Decision Engine' }, position: { x: 250, y: 400 } },
  { id: '7', data: { label: 'Auto-Scaling' }, position: { x: 100, y: 500 } },
  { id: '8', data: { label: 'Self-Healing' }, position: { x: 250, y: 500 } },
  { id: '9', data: { label: 'Alert Routing' }, position: { x: 400, y: 500 } },
  { id: '10', type: 'output', data: { label: 'Ops Dashboard' }, position: { x: 250, y: 600 } },
];

const intelligentOpsEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e6-8', source: '6', target: '8', animated: true },
  { id: 'e6-9', source: '6', target: '9', animated: true },
  { id: 'e7-10', source: '7', target: '10' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e9-10', source: '9', target: '10' },
];

// Event-Driven Architecture Diagram
const eventDrivenNodes = [
  { id: '1', type: 'input', data: { label: 'Event Sources' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Event Router' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'Message Queue' }, position: { x: 100, y: 200 } },
  { id: '4', data: { label: 'Event Stream' }, position: { x: 400, y: 200 } },
  { id: '5', data: { label: 'Lambda Function' }, position: { x: 50, y: 320 } },
  { id: '6', data: { label: 'K8s Worker' }, position: { x: 200, y: 320 } },
  { id: '7', data: { label: 'Stream Processor' }, position: { x: 350, y: 320 } },
  { id: '8', data: { label: 'Analytics Engine' }, position: { x: 500, y: 320 } },
  { id: '9', data: { label: 'State Store' }, position: { x: 250, y: 440 } },
  { id: '10', type: 'output', data: { label: 'Output Actions' }, position: { x: 250, y: 540 } },
];

const eventDrivenEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e3-6', source: '3', target: '6', animated: true },
  { id: 'e4-7', source: '4', target: '7', animated: true },
  { id: 'e4-8', source: '4', target: '8', animated: true },
  { id: 'e5-9', source: '5', target: '9' },
  { id: 'e6-9', source: '6', target: '9' },
  { id: 'e7-9', source: '7', target: '9' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e9-10', source: '9', target: '10', animated: true },
];

const geminiCliNodes = [
  { id: '1', type: 'input', data: { label: 'Developer Command' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Gemini CLI' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'Gemini API (Reasoning)' }, position: { x: 100, y: 200 } },
  { id: '4', data: { label: 'Context Analysis' }, position: { x: 400, y: 200 } },
  { id: '5', data: { label: 'Generated Scripts/IaC' }, position: { x: 250, y: 300 } },
  { id: '6', data: { label: 'Validation Layer' }, position: { x: 250, y: 400 } },
  { id: '7', type: 'output', data: { label: 'Cloud Deployment' }, position: { x: 250, y: 500 } },
];

const geminiCliEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Revolutionizing DevOps: The Convergence of AI, AIOps, and MLOps',
    slug: 'revolutionizing-devops-aiops-mlops',
    summary: 'Explore how artificial intelligence is transforming traditional DevOps practices into intelligent operations. Learn about AIOps for IT automation and MLOps for machine learning lifecycle management, and how they work together to build self-healing systems.',
    date: '2024-01-06',
    readTime: '12 min',
    tags: ['AI', 'DevOps', 'AIOps', 'MLOps', 'Automation'],
    image: '/src/assets/devops-aiops-mlops.png',
    content: `## The Evolution of DevOps

In the rapidly evolving landscape of software development and operations, we stand at a pivotal moment where artificial intelligence is fundamentally reshaping how we build, deploy, and maintain systems. Traditional DevOps practices, while revolutionary in their time, are now being augmented and in some cases replaced by intelligent automation systems.

DevOps emerged as a response to the silos between development and operations teams. It emphasized collaboration, continuous integration and delivery (CI/CD), infrastructure as code, and monitoring. However, as systems become increasingly complex with microservices, cloud-native architectures, and distributed systems, the manual processes and rule-based automation of traditional DevOps are reaching their limits.

## Enter AIOps: Intelligent Operations

AIOps (Artificial Intelligence for IT Operations) represents the next evolution in IT operations management. It combines big data and machine learning to automate IT operations processes, including event correlation, anomaly detection, and root cause analysis.

The core value proposition of AIOps lies in its ability to process vast amounts of operational data that would overwhelm human operators. Modern systems generate millions of metrics, logs, and traces daily. Traditional monitoring tools struggle with this volume, leading to alert fatigue and missed critical incidents.

AIOps platforms use machine learning algorithms to:
- Detect anomalies that humans might miss
- Correlate events across different systems
- Predict failures before they occur
- Automatically remediate common issues
- Provide insights into system health and performance

## The Rise of MLOps

While AIOps focuses on general IT operations, MLOps (Machine Learning Operations) addresses the unique challenges of deploying and maintaining machine learning models in production. Traditional software development practices don't fully apply to ML systems, where models are probabilistic, data-dependent, and require continuous monitoring and retraining.

MLOps provides a framework for managing the entire machine learning lifecycle, from data collection and preparation to model training, evaluation, deployment, and monitoring. It brings the principles of DevOps—automation, continuous integration, and continuous delivery—to the world of machine learning.

Key aspects of MLOps include:
- Data versioning and lineage tracking
- Automated model training pipelines
- Model evaluation and validation
- Continuous model deployment
- Monitoring model performance and data drift
- Automated retraining and rollback

## The Synergy Between AIOps and MLOps

The true power of these technologies emerges when they work together. AIOps can monitor the infrastructure running ML models, while MLOps ensures the models themselves are performing optimally. This creates a powerful feedback loop where both the systems and the models continuously improve.

## Building Self-Healing Systems

The ultimate goal of combining AIOps and MLOps is to create self-healing systems that can detect, diagnose, and resolve issues without human intervention. These systems operate on three levels:

**Level 1: Detection**
The system continuously monitors all aspects of the infrastructure and applications. AIOps algorithms analyze metrics, logs, and traces in real-time, identifying anomalies that might indicate problems.

**Level 2: Diagnosis**
When an anomaly is detected, the system uses correlation and causal inference to understand the root cause.

**Level 3: Remediation**
Once the problem is understood, the system takes action. This could range from simple fixes like restarting a service or scaling resources, to more complex actions like rolling back a deployment.

## Conclusion

The convergence of AI, AIOps, and MLOps represents a fundamental shift in how we approach operations. No longer are operations teams reactive responders to incidents—they're architects of intelligent systems that can predict and prevent problems before they occur.`
  },
  {
    id: '2',
    title: 'Automating Cloud Infrastructure: From Manual ClickOps to GitOps',
    slug: 'automating-cloud-infrastructure-gitops',
    summary: 'A deep dive into the evolution of cloud infrastructure management, transitioning from manual console operations to Infrastructure as Code (IaC) and finally to GitOps for fully automated, reliable deployments.',
    date: new Date().toISOString().split('T')[0],
    readTime: '10 min',
    tags: ['Automations', 'Cloud', 'DevOps', 'GitOps', 'IaC'],
    image: '/src/assets/gitops-cloud-automation.png',
    content: `## The Journey from ClickOps to GitOps

Cloud computing revolutionized how we deploy and manage applications, but the methods for interacting with the cloud have evolved significantly. In the early days, "ClickOps"—manually clicking through the cloud provider's console—was the norm. Today, we stand at the forefront of the GitOps era, where the entire state of our infrastructure is declared in Git and automatically reconciled by intelligent agents.

## The Perils of ClickOps

"ClickOps" refers to the practice of managing cloud infrastructure through a Graphical User Interface (GUI). While intuitive for beginners, it scales poorly.

**Why ClickOps Fails at Scale:**
*   **Lack of Auditability:** Who changed that security group rule? When? Why?
*   **Drift:** The actual state of the infrastructure inevitably drifts from what the team believes it to be.
*   **Immutability Impossible:** Reproducing an environment is a manual, error-prone process.
*   **Disaster Recovery:** In the event of a catastrophic failure, rebuilding the infrastructure manually is slow and risky.

## Level 1: Infrastructure as Code (IaC)

Infrastructure as Code (IaC) was the first major leap forward. Tools like Terraform, AWS CloudFormation, and Pulumi allowed engineers to define their infrastructure in configuration files.

**Benefits of IaC:**
*   **Version Control:** Infrastructure definitions live in Git, providing a history of changes.
*   **Reproducibility:** Spin up identical environments with a single command.
*   **Review Process:** Infrastructure changes go through the same Pull Request (PR) review process as application code.

## Level 2: GitOps - The Pull Model

GitOps closes the loop. It is an operational framework that takes DevOps best practices used for application development and applies them to infrastructure automation.

**Core Principles of GitOps:**
1.  **Declarative:** The entire system is described declaratively.
2.  **Versioned & Immutable:** The desired system state is versioned in Git.
3.  **Automated Delivery:** Approved changes can be automatically applied to the system.
4.  **Software Agents:** Software agents ensure correctness and alert on divergence.

## Security & Governance

GitOps naturally enhances security.

*   **Access Control:** Developers don't need direct access to the cluster. They only need access to the Git repository.
*   **Audit Trail:** The Git commit history serves as a perfect audit log for compliance.
*   **Policy as Code:** Tools like OPA (Open Policy Agent) or Kyverno can validate manifests before they are applied.

## Conclusion

Transitioning to GitOps is more than just a tool change; it's a culture shift. It demands discipline in how we manage configuration and treat our infrastructure. However, the benefits—reliability, security, and velocity—are undeniable.

The future of cloud automation is here, and it is declarative, versioned, and automated. It is GitOps.`
  },
  {
    id: '3',
    title: 'Intelligent Automation in IT Operations: The AI-Powered Future',
    slug: 'intelligent-automation-it-ops',
    summary: 'Discover how AI-powered automation is transforming IT operations. From predictive scaling to self-healing systems, learn how intelligent automation reduces downtime and enhances operational efficiency.',
    date: '2024-01-08',
    readTime: '8 min',
    tags: ['AI', 'AIOps', 'Automation', 'DevOps', 'Machine Learning'],
    image: '/src/assets/intelligent-automation-ops.png',
    content: `## The Rise of Intelligent Operations

Traditional IT operations rely heavily on reactive approaches—waiting for alerts, manually diagnosing issues, and deploying fixes. This model breaks down at scale. Modern infrastructure generates millions of data points per minute, making it impossible for human operators to process everything effectively.

Intelligent automation changes this paradigm by leveraging AI and machine learning to anticipate, detect, and resolve issues autonomously.

## Core Components of Intelligent Ops

**1. Unified Data Collection**

The foundation of intelligent automation is comprehensive observability. This means aggregating metrics, logs, and traces from every layer of your stack into a unified data lake. Tools like Prometheus, Grafana Loki, and OpenTelemetry provide the data backbone.

**2. AI/ML Analysis Engine**

At the heart of intelligent ops sits the ML engine. It performs:
- **Anomaly Detection:** Identifying unusual patterns that deviate from established baselines
- **Predictive Analytics:** Forecasting resource needs before capacity issues arise
- **Correlation Analysis:** Linking related events across distributed systems

**3. Decision Engine**

The decision engine translates analysis into action. Using predefined runbooks and learned patterns, it determines appropriate responses to detected conditions.

## Practical Use Cases

**Predictive Auto-Scaling**

Instead of scaling reactively based on CPU thresholds, intelligent systems analyze traffic patterns, time-of-day trends, and historical data to scale infrastructure *before* demand spikes. This reduces latency and optimizes costs.

**Self-Healing Infrastructure**

When anomalies are detected, the system can automatically:
- Restart failed pods or services
- Reroute traffic away from degraded nodes
- Trigger rollback to stable versions
- Scale horizontally to handle load

**Intelligent Alert Routing**

AI reduces alert fatigue by:
- Deduplicating related alerts
- Prioritizing based on business impact
- Routing to the appropriate on-call engineer
- Suppressing noise during known maintenance windows

## Implementation Architecture

The architecture follows a clear flow from data collection through intelligent processing to automated actions:

1. **Metrics & Logs** → Collected from all systems
2. **Data Aggregation** → Normalized and correlated
3. **AI/ML Engine** → Analyzes patterns and anomalies
4. **Decision Engine** → Determines appropriate actions
5. **Automated Response** → Executes scaling, healing, or alerting

## Benefits and ROI

Organizations implementing intelligent automation report:
- **40-60% reduction** in mean time to resolution (MTTR)
- **30-50% decrease** in incident volume
- **Significant cost savings** through optimized resource utilization

## Getting Started

Start small with these steps:
1. Establish comprehensive observability
2. Implement basic anomaly detection
3. Create automated runbooks for common issues
4. Gradually expand ML-driven decision making

The journey to intelligent operations is iterative. Each automation reduces operational burden and frees teams to focus on innovation rather than firefighting.`
  },
  {
    id: '4',
    title: 'Event-Driven Automation Architecture: Building Reactive Systems',
    slug: 'event-driven-automation-architecture',
    summary: 'Learn how to architect event-driven automation systems using message queues, serverless functions, and stream processing. Build reactive infrastructure that responds instantly to operational events.',
    date: '2024-01-08',
    readTime: '8 min',
    tags: ['Automation', 'Serverless', 'Event-Driven', 'Kubernetes', 'AWS Lambda'],
    image: '/src/assets/event-driven-automation.png',
    content: `## Why Event-Driven Architecture?

Traditional request-response architectures create tight coupling between services. Event-driven architecture (EDA) decouples producers from consumers, enabling systems that are more scalable, resilient, and maintainable.

For automation, EDA provides the foundation for responsive systems that react to changes in real-time—perfect for DevOps and platform engineering.

## Core Concepts

**Events vs Commands**

- **Events** describe something that happened: "DeploymentCompleted", "PodCrashed"
- **Commands** request an action: "RestartService", "ScaleUp"

Good event-driven automation uses events as triggers for commands.

**Message Queues vs Event Streams**

- **Message Queues** (SQS, RabbitMQ): Point-to-point delivery, guaranteed processing
- **Event Streams** (Kafka, Kinesis): Publish-subscribe, replay capability, ordered delivery

Choose based on your reliability and processing requirements.

## Architecture Components

**1. Event Sources**

Events originate from various sources:
- Infrastructure changes (Kubernetes events, cloud provider events)
- Application logs and metrics
- CI/CD pipeline events
- External webhooks

**2. Event Router**

The router receives all events and directs them to appropriate processors. AWS EventBridge or Apache Kafka serve this role effectively. Your event handler receives events and routes them based on event type—triggering rollbacks for deployment failures or scaling actions for high CPU events.

**3. Event Processors**

Processors handle specific event types:
- **Lambda Functions:** Lightweight, stateless processing
- **Kubernetes Jobs:** Container-based batch processing
- **Stream Processors:** Real-time analytics with Flink or Spark

**4. State Store**

Event-driven systems are often stateless, but automation requires state:
- DynamoDB or Redis for operational state
- S3 for event archives and audit trails

## Example: Automated Incident Response

Here is a complete event-driven incident response flow:

1. **Prometheus Alert** fires → Creates event
2. **Event Router** receives alert event
3. **Lambda Function** enriches with context
4. **Decision Logic** evaluates severity
5. **Automation Actions:** Create ticket, notify team, or auto-remediate

## Benefits for Operations

**Loose Coupling**

Components can be updated, scaled, and replaced independently. A failure in one processor does not cascade.

**Audit Trail**

Every event is logged, providing complete visibility into system behavior and automation decisions.

**Scalability**

Event processing scales horizontally. Burst traffic is absorbed by the queue, preventing overload.

## Implementation Best Practices

1. **Design Events First:** Define your event schema before building processors
2. **Idempotent Handlers:** Ensure processors handle duplicate events gracefully
3. **Dead Letter Queues:** Capture failed events for debugging
4. **Observability:** Trace events through the entire pipeline

## Getting Started

Begin with a simple use case:
1. Pick one operational task to automate
2. Define the triggering event
3. Build a simple Lambda/Function handler
4. Add monitoring and error handling
5. Iterate and expand

Event-driven automation is a mindset shift. Once adopted, teams find themselves naturally thinking in events and building more resilient, responsive systems.`
  },
  {
    id: '5',
    title: 'DevOps Automation using Gemini CLI',
    slug: 'devops-automation-gemini-cli',
    summary: 'Unleash the power of AI in your DevOps workflows with the Gemini CLI. Learn how to automate tasks, generate infrastructure code, and troubleshoot pipelines using Google\'s advanced language models directly from your terminal.',
    date: new Date().toISOString().split('T')[0],
    readTime: '8 min',
    tags: ['DevOps', 'Gemini', 'AI', 'CLI', 'Automation'],
    image: '/src/assets/gemini-cli-devops.png',
    content: `## The Next Frontier: Conversational DevOps

The command line has always been the home of the DevOps engineer. But what if your command line could think, reason, and help you solve problems? Enter the **Gemini CLI**, a tool that brings the power of Google's Gemini models directly to your terminal.

## Intelligent Automation

Traditional automation scripts are brittle. They break when APIs change or when edge cases occur. Gemini CLI introduces "Intelligent Automation"—scripts that generated code on the fly based on high-level intent.

![Gemini CLI Action](/src/assets/gemini-cli-devops.png)

## How It Works

As illustrated in the diagram above, the flow starts with a high-level developer intent. The CLI captures this, enriches it with local context (like your current project structure), and sends it to the Gemini API.

The model reasons about the best way to achieve the goal—whether it's provisioning a GKE cluster or fixing a broken CI pipeline—and generates the necessary commands or configuration files.

## Case Study: Instant Infrastructure

Imagine typing:
\`\`\`bash
gemini infra "Create a highly available Redis cluster on AWS with monitoring"
\`\`\`

Instead of searching for Terraform modules, Gemini CLI:
1.  Generates the Terraform HCL.
2.  Validates it against best practices.
3.  Explains the plan to you.
4.  Applies it upon confirmation.

## Conclusion

This isn't just a productivity boost; it's a fundamental shift in how we interact with infrastructure. We are moving from imperative commands to intent-based operations.`
  }
];

export const blogDiagrams: Record<string, DiagramConfig> = {
  'aiops-mlops': {
    nodes: aiopsMlopsNodes,
    edges: aiopsMlopsEdges
  },
  'mlops-lifecycle': {
    nodes: mlopsLifecycleNodes,
    edges: mlopsLifecycleEdges
  },
  'automating-cloud-infrastructure-gitops': {
    nodes: gitOpsNodes,
    edges: gitOpsEdges
  },
  'intelligent-automation-it-ops': {
    nodes: intelligentOpsNodes,
    edges: intelligentOpsEdges
  },
  'event-driven-automation-architecture': {
    nodes: eventDrivenNodes,
    edges: eventDrivenEdges
  },
  'devops-automation-gemini-cli': {
    nodes: geminiCliNodes,
    edges: geminiCliEdges
  }
};
