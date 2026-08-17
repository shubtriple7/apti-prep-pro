import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAptivio } from "@/lib/aptivio/store";
import type { Profile } from "@/lib/aptivio/types";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your profile — Aptivio" },
      {
        name: "description",
        content:
          "Tell Aptivio your college, branch and target companies so your daily 10-minute sessions match the roles you're preparing for.",
      },
      { property: "og:title", content: "Set up your profile — Aptivio" },
      {
        property: "og:description",
        content: "Three quick steps to personalise your daily placement practice.",
      },
    ],
  }),
  component: Onboarding,
});

const COMPANIES = [
  "TCS",
  "Infosys",
  "Wipro",
  "Accenture",
  "Cognizant",
  "Deloitte",
  "Amazon",
  "Microsoft",
  "Google",
  "Zoho",
  "Flipkart",
  "Goldman Sachs",
];

const EMPTY: Profile = {
  fullName: "",
  college: "",
  degree: "B.Tech",
  branch: "",
  graduationYear: "2027",
  targetCompanies: [],
};

function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAptivio();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(EMPTY);

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const canContinue =
    step === 0
      ? profile.fullName.trim().length > 1
      : step === 1
        ? profile.college.trim().length > 1 && profile.branch.trim().length > 1
        : profile.targetCompanies.length > 0;

  function next() {
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    completeOnboarding(profile);
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-8"
        >
          {step === 0 ? (
            <div className="space-y-5">
              <div>
                <h1 className="font-display text-2xl font-semibold">Welcome to Aptivio</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ten minutes each morning and evening. Let's start with your name.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  placeholder="Ananya Rao"
                  onChange={(e) => set("fullName", e.target.value)}
                />
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <h1 className="font-display text-2xl font-semibold">Your campus</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  This powers your college leaderboard and readiness certificate.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  value={profile.college}
                  placeholder="VIT Vellore"
                  onChange={(e) => set("college", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={profile.degree}
                    onChange={(e) => set("degree", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Graduation year</Label>
                  <Input
                    id="year"
                    value={profile.graduationYear}
                    onChange={(e) => set("graduationYear", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  value={profile.branch}
                  placeholder="Computer Science"
                  onChange={(e) => set("branch", e.target.value)}
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-5">
              <div>
                <h1 className="font-display text-2xl font-semibold">Target companies</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pick a few. Questions tagged to these show up more often.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {COMPANIES.map((company) => {
                  const picked = profile.targetCompanies.includes(company);
                  return (
                    <button
                      key={company}
                      type="button"
                      onClick={() =>
                        set(
                          "targetCompanies",
                          picked
                            ? profile.targetCompanies.filter((c) => c !== company)
                            : [...profile.targetCompanies, company],
                        )
                      }
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                        picked
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40",
                      )}
                    >
                      {company}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </motion.div>

        <div className="mt-10 flex items-center gap-3">
          {step > 0 ? (
            <Button variant="outline" size="lg" onClick={() => setStep(step - 1)}>
              <ArrowLeft /> Back
            </Button>
          ) : null}
          <Button
            variant="gold"
            size="lg"
            className="flex-1"
            disabled={!canContinue}
            onClick={next}
          >
            {step === 2 ? "Start day 1" : "Continue"} <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
