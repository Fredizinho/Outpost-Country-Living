import { ShoppingBag, Search, Mountain } from 'lucide-react';

export interface Subtask {
  id: string;
  label: string;
  completed: boolean;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  icon: any;
  subtasks: Subtask[];
}

export interface OnboardingAnswers {
  district: string;
  region: string;
  homesteadGoal: string;
  householdSize: string;
  budgetBand: string;
  timeline: string;
}

export function generatePersonalizedRoadmap(answers: Partial<OnboardingAnswers>): Step[] {
  const district = answers.district || 'Dedza';
  const region = answers.region || 'Central';
  const goal = answers.homesteadGoal || 'Self-Sufficient Organic Homestead';
  const size = answers.householdSize || '3-5 Members';
  const budget = answers.budgetBand || 'Standard Off-Grid';
  const timeline = answers.timeline || 'This Season (3-6 Months)';

  // Subtasks for Phase 1: Preparation
  const prepTasks: Subtask[] = [
    { id: 'p1', label: 'Clear high-interest urban debts & build emergency liquidity fund', completed: false },
  ];

  if (budget.includes('Minimalist') || budget.includes('< MWK 500')) {
    prepTasks.push({ id: 'p_budget', label: 'Budget Focus: Prioritize DIY tools, compressed earth techniques & seed saving', completed: false });
  } else if (budget.includes('Full Outpost') || budget.includes('> MWK 2.5M')) {
    prepTasks.push({ id: 'p_budget', label: 'Budget Allocation: Reserve quotes for borehole drilling & hybrid solar inverter system', completed: false });
  } else {
    prepTasks.push({ id: 'p_budget', label: 'Budget Plan: Secure 12-month reserve for land purchase, basic solar & water setup', completed: false });
  }

  if (size.includes('6+')) {
    prepTasks.push({ id: 'p_size', label: 'Household Storage: Calculate 2,400kg staple grain bank & large-scale cookware for 6+ members', completed: false });
  } else if (size.includes('1-2')) {
    prepTasks.push({ id: 'p_size', label: 'Household Storage: Stock 600kg compact non-perishable grain pantry & portable solar battery', completed: false });
  } else {
    prepTasks.push({ id: 'p_size', label: 'Household Storage: Prepare 1,200kg staple food storage (maize, beans, peanuts, groundnuts)', completed: false });
  }

  if (timeline.includes('Immediate')) {
    prepTasks.push({ id: 'p_time', label: 'Rapid Action: Secure portable shelter/tentage & 90-day immediate supply dry rations', completed: false });
  } else {
    prepTasks.push({ id: 'p_time', label: 'Skills Training: Master solar maintenance, bio-intensive composting & food preservation', completed: false });
  }

  // Subtasks for Phase 2: Land Scouting
  const scoutTasks: Subtask[] = [
    { id: 's1', label: `Evaluate land availability & traditional authority protocols in ${district} (${region} Region)`, completed: false },
  ];

  // District-specific land tasks
  const lowerDist = district.toLowerCase();
  if (lowerDist.includes('dedza') || lowerDist.includes('ntcheu') || lowerDist.includes('viphya')) {
    scoutTasks.push({ id: 's_district', label: `Soil & Frost Check: Test ${district} highland clay for organic matter & prepare windbreaks`, completed: false });
  } else if (lowerDist.includes('salima') || lowerDist.includes('karonga') || lowerDist.includes('mangochi') || lowerDist.includes('nkhotakota')) {
    scoutTasks.push({ id: 's_district', label: `Lakeshore Climate: Verify shallow borehole depth & plan shade-netting for intense heat`, completed: false });
  } else if (lowerDist.includes('mulanje') || lowerDist.includes('thyolo') || lowerDist.includes('zomba')) {
    scoutTasks.push({ id: 's_district', label: `High Rainfall Zone: Test soil pH for acidity & inspect slope drainage near ${district}`, completed: false });
  } else {
    scoutTasks.push({ id: 's_district', label: `Water Table Inspection: Verify year-round groundwater depth & stream flow in ${district}`, completed: false });
  }

  scoutTasks.push({ id: 's3', label: 'Inspect 3 candidate rural properties with direct road access & secure boundary legalities', completed: false });

  // Subtasks for Phase 3: The Exodus & Infrastructure
  const exodusTasks: Subtask[] = [
    { id: 'e1', label: 'Finalize land lease or customary land title documentation with district council', completed: false },
  ];

  // Goal-specific tasks
  const lowerGoal = goal.toLowerCase();
  if (lowerGoal.includes('organic') || lowerGoal.includes('farm') || lowerGoal.includes('garden')) {
    exodusTasks.push({ id: 'e_goal', label: 'Organic Production: Construct 10 deep double-dug bio-intensive garden beds & heirloom seed vault', completed: false });
  } else if (lowerGoal.includes('medical') || lowerGoal.includes('sanctuary') || lowerGoal.includes('retreat')) {
    exodusTasks.push({ id: 'e_goal', label: 'Sanctuary Care: Establish dedicated herbal garden (Artemisia, Moringa, Neem, Aloe) & quiet rest quarters', completed: false });
  } else if (lowerGoal.includes('seed') || lowerGoal.includes('nursery') || lowerGoal.includes('commercial')) {
    exodusTasks.push({ id: 'e_goal', label: 'Seed Sanctuary: Construct ventilated clay seed drying shed & solar food dehydrator', completed: false });
  } else {
    exodusTasks.push({ id: 'e_goal', label: 'Homestead Infrastructure: Install off-grid gravity rainwater harvesting & solar array', completed: false });
  }

  if (budget.includes('Minimalist') || budget.includes('< MWK 500')) {
    exodusTasks.push({ id: 'e_infra', label: 'Water & Energy: Build 1,000L rainwater catchment & 300W DC solar lighting circuit', completed: false });
  } else if (budget.includes('Full Outpost') || budget.includes('> MWK 2.5M')) {
    exodusTasks.push({ id: 'e_infra', label: 'Water & Energy: Drill 80m solar borehole & install 3.5kVA hybrid lithium power hub', completed: false });
  } else {
    exodusTasks.push({ id: 'e_infra', label: 'Water & Energy: Install 800W solar pumping system & 2,500L water holding tank', completed: false });
  }

  return [
    {
      id: 'prepare',
      title: 'The Preparation Phase',
      description: `Tailored for ${size} | ${budget} budget strategy | ${timeline}`,
      icon: ShoppingBag,
      subtasks: prepTasks,
    },
    {
      id: 'scout',
      title: 'Land Scouting in ' + district,
      description: `Targeting ${district} (${region} Region) soil, water table, and customary land terms`,
      icon: Search,
      subtasks: scoutTasks,
    },
    {
      id: 'exodus',
      title: 'Exodus & Sanctuary Setup',
      description: `Target Goal: "${goal}"`,
      icon: Mountain,
      subtasks: exodusTasks,
    },
  ];
}
