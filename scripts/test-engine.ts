import { scaleQuantity, convertToEstimatedGrams } from "../src/lib/units/converter";
import { formatQuantity, getUnitDisplayLabel } from "../src/lib/units/format";
import { calculateRecipeNutrition } from "../src/lib/nutrition/calculator";
import { matchRecipesWithPantry } from "../src/lib/pantry/matcher";
import { aggregateGroceryList, groupGroceryByCategory } from "../src/lib/grocery/aggregator";
import { findSubstitutions } from "../src/lib/substitutions/database";
import { KITCHEN_EMERGENCIES } from "../src/data/kitchen-first-aid";
import { getApplianceData } from "../src/data/appliance-conversions";
import { MOCK_RECIPES, INITIAL_PANTRY_ITEMS } from "../src/data/mock-recipes";
import fs from "fs";
import path from "path";

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log("\n🧪 Running Resepy Domain Logic Tests...\n");

// 1. Test Scale Quantity
console.log("1. Testing Dynamic Portion Scaler:");
assert(scaleQuantity(2, 4, 8) === 4, "Scaling 2 qty from 4 to 8 servings should be 4");
assert(scaleQuantity(3, 6, 2) === 1, "Scaling 3 qty from 6 to 2 servings should be 1");
assert(scaleQuantity(1.5, 2, 4) === 3, "Scaling 1.5 qty from 2 to 4 servings should be 3");

// 2. Test Format Quantity
console.log("\n2. Testing Fractional Formatting:");
assert(formatQuantity(1.5) === "1 ½", "1.5 should format to '1 ½'");
assert(formatQuantity(0.25) === "¼", "0.25 should format to '¼'");
assert(formatQuantity(2) === "2", "2 should format to '2'");
assert(formatQuantity(0.75) === "¾", "0.75 should format to '¾'");

// 3. Test Unit Conversion to Estimated Grams
console.log("\n3. Testing Unit Conversion (Indonesian & Metric Units):");
assert(convertToEstimatedGrams(2, "SIUNG") === 10, "2 siung bawang should be ~10g");
assert(convertToEstimatedGrams(1, "RUAS") === 10, "1 ruas jahe should be ~10g");
assert(convertToEstimatedGrams(2, "TABLESPOON") === 30, "2 sdm liquid should be ~30g");
assert(convertToEstimatedGrams(250, "GRAM") === 250, "250g should stay 250g");

// 4. Test Nutrition Calculator
console.log("\n4. Testing Nutrition Calculator:");
const rendang = MOCK_RECIPES[0];
const nutrition = calculateRecipeNutrition(rendang.components, rendang.defaultServings);
assert(nutrition.perServing.calories > 200, "Rendang calories per serving should be > 200 kkal");
assert(nutrition.allergens.includes("TREE_NUT"), "Rendang with kemiri should detect TREE_NUT allergen");

// 5. Test Smart Pantry Reverse Matcher
console.log("\n5. Testing Smart Pantry Reverse Matcher:");
const matched = matchRecipesWithPantry(MOCK_RECIPES, INITIAL_PANTRY_ITEMS, Date.now());
assert(matched.length === MOCK_RECIPES.length, "Should match against all mock recipes");
assert(matched[0].matchPercentage >= matched[1].matchPercentage, "Results should be sorted descending by match %");
console.log(`   Top matched recipe: "${matched[0].recipe.title}" (${matched[0].matchPercentage}% match)`);

// 6. Test Smart Grocery List Aggregator
console.log("\n6. Testing Smart Grocery Aggregator:");
const groceryItems = aggregateGroceryList([
  { recipe: MOCK_RECIPES[0], targetServings: 6 },
  { recipe: MOCK_RECIPES[1], targetServings: 4 },
]);
assert(groceryItems.length > 0, "Should generate aggregated grocery items");
const grouped = groupGroceryByCategory(groceryItems);
assert(Object.keys(grouped).length > 1, "Should group items into multiple supermarket aisles");

// 7. Test Ingredient Substitution Engine
console.log("\n7. Testing Ingredient Substitution Engine:");
const asamKandisSubs = findSubstitutions("Asam Kandis");
assert(Boolean(asamKandisSubs && asamKandisSubs.length > 0), "Asam Kandis should have substitutes");
assert(Boolean(asamKandisSubs?.[0]?.name.includes("Asam Jawa")), "Asam Kandis substitute should include Asam Jawa");

const santanSubs = findSubstitutions("Santan Kental dari 3 butir kelapa");
assert(Boolean(santanSubs && santanSubs.length > 0), "Santan Kental should have substitutes");
assert(Boolean(santanSubs?.[0]?.name.includes("Susu Evaporasi")), "Santan substitute should suggest Susu Evaporasi");

const kemiriSubs = findSubstitutions("Kemiri Sangrai");
assert(Boolean(kemiriSubs && kemiriSubs.length > 0), "Kemiri should have substitutes");

// 8. Test Kitchen First-Aid Emergency Knowledge Base
console.log("\n8. Testing Kitchen First-Aid Knowledge Base:");
assert(KITCHEN_EMERGENCIES.length >= 5, "Kitchen emergencies knowledge base should have at least 5 remedies");
const asinFix = KITCHEN_EMERGENCIES.find((k) => k.id === "asin");
assert(Boolean(asinFix?.quickFix.includes("kentang")), "Too salty fix should recommend raw potato absorption");
const santanFix = KITCHEN_EMERGENCIES.find((k) => k.id === "santan-pecah");
assert(Boolean(santanFix?.quickFix.includes("maizena")), "Broken santan fix should recommend starch emulsifier");

// 9. Test Multi-Appliance Converter Engine
console.log("\n9. Testing Multi-Appliance Converter Engine:");
const katsuAppliances = getApplianceData("japanese-chicken-katsu-curry");
assert(katsuAppliances.some((a) => a.appliance === "AIR_FRYER"), "Katsu should support Air Fryer conversion");
assert(katsuAppliances.some((a) => a.appliance === "OVEN"), "Katsu should support Oven conversion");
const airFryerKatsu = katsuAppliances.find((a) => a.appliance === "AIR_FRYER");
assert(Boolean(airFryerKatsu?.recommendedTemp?.includes("185")), "Air fryer katsu temp should be recommended ~185°C");

// 10. Test PWA Manifest Existence
console.log("\n10. Testing PWA Manifest & App Config:");
const manifestPath = path.join(process.cwd(), "public", "manifest.json");
assert(fs.existsSync(manifestPath), "public/manifest.json should exist");
const manifestContent = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
assert(manifestContent.display === "standalone", "PWA display should be standalone");
assert(manifestContent.theme_color === "#ea580c", "PWA theme color should be #ea580c");

console.log(`\n========================================`);
console.log(`Total Tests: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
