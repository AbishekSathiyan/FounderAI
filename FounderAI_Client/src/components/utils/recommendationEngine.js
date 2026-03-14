export const getRecommendation = (inputs, freezones) => {
  const { industry, budget, visas } = inputs;

  const eligibleZones = freezones.filter(zone =>
    zone.industries.includes(industry) &&
    budget >= zone.minBudget &&
    visas <= zone.maxVisas
  );

  if (eligibleZones.length === 0) {
    return null;
  }

  const scoredZones = eligibleZones.map(zone => {
    const totalCost =
      zone.licenseCost +
      (zone.visaCost * visas) +
      zone.officeCost;

    const remainingBudget = budget - totalCost;

    return {
      ...zone,
      totalCost,
      remainingBudget
    };
  });

  scoredZones.sort((a, b) => b.remainingBudget - a.remainingBudget);

  const best = scoredZones[0];

  return {
    name: best.name,
    totalCost: best.totalCost,
    breakdown: {
      license: best.licenseCost,
      visas: best.visaCost * visas,
      office: best.officeCost
    },
    timeline: best.timeline,
    documents: best.documents,
    notes: [
      "Cannot trade in mainland without distributor",
      visas > 3 ? "Office upgrade may be required" : null
    ].filter(Boolean),
    reason: `Matches your ${industry} industry, supports ${visas} visas, and fits within your AED ${budget} budget.`
  };
};