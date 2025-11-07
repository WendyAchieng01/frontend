<template>
  <v-row>
    <v-col>
      <v-form @submit.prevent="createJobAndTrainings">
        <template #default="{ isValid }">
          <v-text-field
            v-model="jobForm.title"
            label="Job Title"
            placeholder="e.g., Data Entry Specialist"
            :rules="[required]"
            :error-messages="jobFormErrors.title"
          />
          <v-select
            v-model="jobForm.category"
            label="Category"
            :items="jobCategories"
            item-title="text"
            item-value="text"
            :rules="[required]"
            :error-messages="jobFormErrors.category"
          />

          <v-text-field
            v-model="jobForm.price"
            label="Budget (KES)"
            placeholder="e.g., 500.00"
            type="number"
            step="0.01"
            :rules="[required, isNumber, positiveNumber]"
            :error-messages="jobFormErrors.price"
          />
          <v-text-field
            v-model="jobForm.deadline_date"
            label="Deadline Date"
            type="date"
            :rules="[required, isFutureDate]"
            :error-messages="jobFormErrors.deadline_date"
          />

          <v-text-field
            v-model="jobForm.max_freelancers"
            label="Max Freelancers"
            placeholder="e.g., 1"
            type="number"
            :rules="[isInteger, positiveNumber]"
            :error-messages="jobFormErrors.max_freelancers"
          />
          <v-select
            v-model="jobForm.preferred_freelancer_level"
            label="Preferred Freelancer Level"
            :items="preferredLevels"
            item-title="text"
            item-value="value"
            :error-messages="jobFormErrors.preferred_freelancer_level"
          />
          <v-select
            v-model="jobForm.skills_required"
            label="Skills Required"
            :items="skills"
            item-title="text"
            item-value="text"
            :error-messages="jobFormErrors.skills_required"
            multiple
            chips
            closable-chips
          />

          <p class="text-subtitle-1 mt-4 mb-2">Description & Responsibility</p>
          <v-textarea
            v-model="jobForm.description"
            label="Job Description"
            placeholder="Detailed description of the job..."
            :rules="[required]"
            :error-messages="jobFormErrors.description"
          />
          <v-textarea
            label="Responsibilities"
            placeholder="Key responsibilities for the freelancer..."
            :rules="[required]"
            :error-messages="jobFormErrors.responsibilities"
          />

          <v-divider class="my-6" />

          <p class="text-h6 mt-4 mb-2">Training Materials (Optional)</p>
          <p class="text-body-2 mb-4">
            You can attach relevant training documents or videos for this job.
          </p>

          <v-text-field
            v-model="trainingForm.title"
            label="Training Title"
            placeholder="e.g., Onboarding Document for Project X"
            :error-messages="trainingFormErrors.title"
          />
          <v-textarea
            v-model="trainingForm.texts"
            label="Training Description"
            placeholder="Provide detailed instructions or text content for training."
            :error-messages="trainingFormErrors.texts"
          />
          <div class="d-flex flex-column flex-sm-row ga-2 mt-3">
            <div class="flex-grow-1">
              <v-file-input
                v-model="trainingForm.pdf_document"
                label="Attach PDF Document"
                prepend-inner-icon="mdi-paperclip"
                chips
                closable-chips
                show-size
                :error-messages="trainingFormErrors.pdf_document"
              />
            </div>
            <div class="flex-grow-1">
              <v-text-field
                v-model="trainingForm.video_url"
                label="Video URL"
                placeholder="Paste the training video link (Youtube, Vimeo etc.)"
                :error-messages="trainingFormErrors.video_url"
              />
            </div>
          </div>
          <v-alert
            v-if="jobFormErrors.non_field_errors || jobFormErrors.detail"
            type="error"
            variant="tonal"
            class="my-3"
            density="compact"
          >
            {{ jobFormErrors.non_field_errors?.[0] || jobFormErrors.detail }}
          </v-alert>

          <v-btn
            text="Post Job"
            append-icon="mdi-arrow-right"
            size="large"
            class="text-subtitle-2 font-weight-light mt-5"
            type="submit"
            block
            :loading="jobStore.isLoading"
            :disabled="!isValid.value || jobStore.isLoading"
          />
        </template>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useClientJobsStore } from "~/store/client/jobs";
import { useClientTrainingsStore } from "~/store/client/training";
import { useAppStore } from "~/store/app";
import { useCommonSkillsStore } from "~/store/common/skills";
import { useForm } from "~/composables/useForm";
import type {
  IJobCreatePayload,
  ITrainingCreatePayload,
  JobCategory,
  PreferredFreelancerLevel,
  IJob,
} from "~/types/client.d";

const jobStore = useClientJobsStore();
const trainingStore = useClientTrainingsStore();
const appStore = useAppStore();
const skillStore = useCommonSkillsStore();

onMounted(async () => {
  await skillStore.fetchAllSkills();
});

// ------------------------------------
// Form Initialization
// ------------------------------------

const {
  form: jobForm,
  errors: jobFormErrors,
  clearErrors: clearJobFormErrors,
  reset: resetJobForm,
} = useForm<IJobCreatePayload>({
  title: "",
  category: "Data Entry",
  description: "",
  price: "0.00",
  deadline_date: "",
  status: "open",
  max_freelancers: 1,
  preferred_freelancer_level: "entry",
  skills_required: [],
});

const {
  form: trainingForm,
  errors: trainingFormErrors,
  setErrors: setTrainingFormErrors,
  clearErrors: clearTrainingFormErrors,
  reset: resetTrainingForm,
} = useForm<ITrainingCreatePayload>({
  title: "",
  texts: "",
  pdf_document: null,
  video_url: null,
});

// ------------------------------------
// Validation Rules (Reusable)
// ------------------------------------
const isNumber = (value: string) =>
  !isNaN(parseFloat(value)) || "Must be a number";
const positiveNumber = (value: string | number) =>
  parseFloat(value as string) > 0 || "Must be a positive number";
const isInteger = (value: string | number) =>
  Number.isInteger(parseFloat(value as string)) || "Must be an integer";
const isFutureDate = (value: string) => {
  if (!value) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inputDate = new Date(value);
  return inputDate >= today || "Date must be in the future or today";
};

// ------------------------------------
// Static Data for Selects
// ------------------------------------
const jobCategories: Array<{ text: string; value: JobCategory }> = [
  { text: "Data Entry", value: "data_entry" },
  { text: "Translation", value: "translation" },
  { text: "Transcription and Captioning", value: "transcription" },
  { text: "Graphics", value: "graphics" },
  { text: "Writing and Editing", value: "writing" },
  { text: "App and Web Development", value: "web_dev" },
  { text: "IT Project Management", value: "project_mgmt" },
  { text: "Software Testing", value: "testing" },
  { text: "Virtual Assistance", value: "virtual_assist" },
  { text: "Social Media Management", value: "social_media" },
  { text: "AI Model Training", value: "ai_training" },
];

const preferredLevels: Array<{
  text: string;
  value: PreferredFreelancerLevel;
}> = [
  { text: "Entry Level", value: "entry" },
  { text: "Intermediate", value: "intermediate" },
  { text: "Expert", value: "expert" },
];

const skills: Array<{
  text: string;
  value: string;
}> = [
  { text: "Python", value: "python" },
  { text: "Javascript", value: "javascript" },
  { text: "Java", value: "java" },
  { text: "C#", value: "csharp" },
  { text: "C++", value: "cpp" },
  { text: "PHP", value: "php" },
  { text: "Ruby", value: "ruby" },
  { text: "Swift", value: "swift" },
  { text: "Kotlin", value: "kotlin" },
  { text: "Go", value: "go" },
  { text: "Rust", value: "rust" },
  { text: "TypeScript", value: "typescript" },
  { text: "HTML", value: "html" },
  { text: "CSS", value: "css" },
  { text: "React", value: "react" },
  { text: "Angular", value: "angular" },
  { text: "Vue", value: "vue" },
  { text: "Django", value: "django" },
  { text: "Flask", value: "flask" },
  { text: "Node.js", value: "nodejs" },
  { text: "Express", value: "express" },
  { text: "Spring", value: "spring" },
  { text: "Laravel", value: "laravel" },
  { text: "ASP.NET", value: "aspnet" },
  { text: "jQuery", value: "jquery" },
  { text: "Bootstrap", value: "bootstrap" },
  { text: "Tailwind CSS", value: "tailwind" },
  { text: "Android", value: "android" },
  { text: "iOS", value: "ios" },
  { text: "Flutter", value: "flutter" },
  { text: "React Native", value: "reactnative" },
  { text: "Xamarin", value: "xamarin" },
  { text: "SQL", value: "sql" },
  { text: "MySQL", value: "mysql" },
  { text: "PostgreSQL", value: "postgresql" },
  { text: "MongoDB", value: "mongodb" },
  { text: "Oracle", value: "oracle" },
  { text: "Firebase", value: "firebase" },
  { text: "Redis", value: "redis" },
  { text: "AWS", value: "aws" },
  { text: "Azure", value: "azure" },
  { text: "GCP", value: "gcp" },
  { text: "Docker", value: "docker" },
  { text: "Kubernetes", value: "kubernetes" },
  { text: "Jenkins", value: "jenkins" },
  { text: "GitOps", value: "gitops" },
  { text: "Terraform", value: "terraform" },
  { text: "Ansible", value: "ansible" },
  { text: "Python (Data)", value: "python_data" },
  { text: "R", value: "r" },
  { text: "Machine Learning", value: "machine_learning" },
  { text: "Deep Learning", value: "deep_learning" },
  { text: "TensorFlow", value: "tensorflow" },
  { text: "PyTorch", value: "pytorch" },
  { text: "Pandas", value: "pandas" },
  { text: "NumPy", value: "numpy" },
  { text: "Scikit-learn", value: "scikit" },
  { text: "NLP", value: "nlp" },
  { text: "Computer Vision", value: "computer_vision" },
  { text: "UI/UX", value: "uiux" },
  { text: "Graphic Design", value: "graphic_design" },
  { text: "Figma", value: "figma" },
  { text: "Adobe XD", value: "adobe_xd" },
  { text: "Sketch", value: "sketch" },
  { text: "Photoshop", value: "photoshop" },
  { text: "Illustrator", value: "illustrator" },
  { text: "Agile", value: "agile" },
  { text: "Scrum", value: "scrum" },
  { text: "Kanban", value: "kanban" },
  { text: "Jira", value: "jira" },
  { text: "Confluence", value: "confluence" },
  { text: "Trello", value: "trello" },
  { text: "Asana", value: "asana" },
  { text: "Git", value: "git" },
  { text: "Testing", value: "testing" },
  { text: "DevOps", value: "devops" },
  { text: "Cybersecurity", value: "cybersecurity" },
  { text: "Blockchain", value: "blockchain" },
  { text: "SEO", value: "seo" },
  { text: "Data Analysis", value: "data_analysis" },
  { text: "Technical Writing", value: "technical_writing" },
];

// ------------------------------------
// Main Job Posting Function
// ------------------------------------
async function createJobAndTrainings() {
  clearJobFormErrors();
  clearTrainingFormErrors();

  let createdJob: IJob | null = null; // To store the job response

  try {
    // 1. Create the Job
    const jobPayload: IJobCreatePayload = {
      title: jobForm.title,
      category: jobForm.category,
      description: jobForm.description,
      price: jobForm.price.toString(),
      deadline_date: jobForm.deadline_date,
      status: jobForm.status,
      max_freelancers: jobForm.max_freelancers,
      preferred_freelancer_level: jobForm.preferred_freelancer_level,
      skills_required: jobForm.skills_required,
    };

    createdJob = await jobStore.createJob(jobPayload);

    // 2. If job creation is successful, attempt to create training materials
    if (
      createdJob &&
      (trainingForm.title ||
        trainingForm.texts ||
        trainingForm.pdf_document ||
        trainingForm.video_url)
    ) {
      // Only create training if at least one content field is filled
      if (
        !trainingForm.title &&
        !trainingForm.texts &&
        !trainingForm.pdf_document &&
        !trainingForm.video_url
      ) {
        appStore.showSnackBar({
          type: "warning",
          message:
            "Training materials section completed but no content has been provided.",
        });
      } else {
        const trainingPayload: ITrainingCreatePayload = {
          title: trainingForm.title,
          texts: trainingForm.texts,
          pdf_document: trainingForm.pdf_document, // This could be a File object
          video_url: trainingForm.video_url,
        };

        // Convert trainingPayload to FormData if it contains a file
        let finalTrainingPayload: ITrainingCreatePayload | FormData;

        // Check if pdf_document is a File object
        const hasFile = trainingPayload.pdf_document instanceof File;

        if (hasFile) {
          // If a file is present, convert the entire payload to FormData
          finalTrainingPayload = toFormData(
            trainingPayload as Record<string, any>
          );
          console.log(
            "Sending training data as FormData:",
            finalTrainingPayload
          );
        } else {
          // Otherwise, send as a regular JSON payload
          finalTrainingPayload = trainingPayload;
          console.log("Sending training data as JSON:", finalTrainingPayload);
        }

        await trainingStore.createTraining(
          createdJob.slug,
          finalTrainingPayload
        ); // Pass the prepared payload
        appStore.showSnackBar({
          type: "success",
          message: "Training materials attached successfully!",
        });
      }
    }

    // Reset forms on overall success
    navigateTo("/client/my-jobs");
    resetJobForm();
    resetTrainingForm();
    appStore.showSnackBar({
      type: "success",
      message: "Job and associated materials posted successfully!",
    });
  } catch (error: any) {
    console.error("Error creating job or training:", error);

    // Handle errors from job creation
    const jobBackendErrors = error.response?._data;
    if (jobBackendErrors) {
      setTrainingFormErrors(jobBackendErrors);
      const generalErrorMessage =
        jobBackendErrors.detail ||
        jobBackendErrors.non_field_errors?.[0] ||
        "Failed to post job. Please check your inputs.";
      appStore.showSnackBar({ type: "error", message: generalErrorMessage });
    } else {
      appStore.showSnackBar({
        type: "error",
        message: "An unexpected error occurred during job creation.",
      });
    }

    // If job creation failed, no training would have been attempted.
    // If job creation succeeded but training failed, this catch block would handle the training error.
    const trainingBackendErrors = error.response?._data;
    if (trainingBackendErrors) {
      setTrainingFormErrors(trainingBackendErrors);
    }
  }
}
</script>
