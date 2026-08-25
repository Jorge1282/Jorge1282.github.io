// src/storage.js
// =============================================
//  MÓDULO DE PERSISTENCIA (localStorage)
// =============================================

export const STORAGE_KEY = 'ff_data_v1';
export const STORAGE_KEY_RATE = 'ff_bcv_rate_v1';
export const STORAGE_KEY_BALANCE = 'ff_initial_balance_v1';
export const STORAGE_KEY_HISTORY = 'ff_bcv_history_v1';
export const STORAGE_KEY_PIN = 'ff_pin_hash_v1';
export const STORAGE_KEY_BUDGETS = 'ff_budgets_v1';
export const STORAGE_KEY_PAYMENTS = 'ff_payments_v1';
export const STORAGE_KEY_SAVINGS = 'ff_savings_v1';
export const STORAGE_KEY_SAVINGS_HISTORY = 'ff_savings_history_v1';
export const STORAGE_KEY_SAVINGS_START = 'ff_savings_start_v1';
export const STORAGE_KEY_NOTIFIED = 'ff_notified_log_v1';
export const STORAGE_KEY_INCOME_GOAL = 'ff_income_goal_v1';
export const STORAGE_KEY_CATEGORIES = 'ff_custom_categories_v1';

// ---- Funciones de carga y guardado ----

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed;
    }
  } catch(e) { console.error('loadData error', e); }
  return null;
}

export function saveData(transactions, goal) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, goal }));
    return true;
  } catch(e) {
    console.error('saveData error', e);
    return false;
  }
}

export function loadCachedRate() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RATE);
    if (raw) return JSON.parse(raw);
  } catch(e) { console.error('loadCachedRate error', e); }
  return null;
}

export function saveCachedRate(rateData) {
  try {
    localStorage.setItem(STORAGE_KEY_RATE, JSON.stringify(rateData));
  } catch(e) { console.error('saveCachedRate error', e); }
}

export function loadInitialBalance() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BALANCE);
    if (raw) return JSON.parse(raw);
  } catch(e) { console.error('loadInitialBalance error', e); }
  return { usd: 0, ves: 0 };
}

export function saveInitialBalanceToStorage(balance) {
  try {
    localStorage.setItem(STORAGE_KEY_BALANCE, JSON.stringify(balance));
  } catch(e) { console.error('saveInitialBalance error', e); }
}

export function loadPin() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PIN);
    if (raw) return raw;
  } catch(e) { console.error('loadPin error', e); }
  return null;
}

export function savePinToStorage(pinHash) {
  try {
    localStorage.setItem(STORAGE_KEY_PIN, pinHash || '');
  } catch(e) { console.error('savePin error', e); }
}

export function loadCustomCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { expense: parsed.expense || [], income: parsed.income || [] };
    }
  } catch(e) { console.error('loadCustomCategories error', e); }
  return { expense: [], income: [] };
}

export function saveCustomCategoriesToStorage(categories) {
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  } catch(e) { console.error('saveCustomCategories error', e); }
}

export function loadFamilyIncomeGoal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INCOME_GOAL);
    if (raw) return JSON.parse(raw);
  } catch(e) { console.error('loadFamilyIncomeGoal error', e); }
  return { usd: 0, ves: 0 };
}

export function saveFamilyIncomeGoalToStorage(goal) {
  try {
    localStorage.setItem(STORAGE_KEY_INCOME_GOAL, JSON.stringify(goal));
  } catch(e) { console.error('saveFamilyIncomeGoal error', e); }
}

export function loadBudgets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BUDGETS);
    if (raw) return JSON.parse(raw);
  } catch(e) { console.error('loadBudgets error', e); }
  return {};
}

export function saveBudgetsToStorage(budgets) {
  try {
    localStorage.setItem(STORAGE_KEY_BUDGETS, JSON.stringify(budgets));
  } catch(e) { console.error('saveBudgets error', e); }
}

export function loadPayments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PAYMENTS);
    if (raw) return JSON.parse(raw);
  } catch(e) { console.error('loadPayments error', e); }
  return {};
}

export function savePaymentsToStorage(payments) {
  try {
    localStorage.setItem(STORAGE_KEY_PAYMENTS, JSON.stringify(payments));
  } catch(e) { console.error('savePayments error', e); }
}

export function loadSavings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVINGS);
    if (raw) return JSON.parse(raw);
  } catch(e) { console.error('loadSavings error', e); }
  return { monthly: { usd: 0, ves: 0 }, weekly: { usd: 0, ves: 0 } };
}

export function saveSavingsToStorage(savings) {
  try {
    localStorage.setItem(STORAGE_KEY_SAVINGS, JSON.stringify(savings));
  } catch(e) { console.error('saveSavings error', e); }
}

export function loadSavingsHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVINGS_HISTORY);
    if (raw) return JSON.parse(raw);
  } catch(e) { console.error('loadSavingsHistory error', e); }
  return { monthly: [] };
}

export function saveSavingsHistoryToStorage(history) {
  try {
    localStorage.setItem(STORAGE_KEY_SAVINGS_HISTORY, JSON.stringify(history));
  } catch(e) { console.error('saveSavingsHistory error', e); }
}

export function loadSavingsStart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVINGS_START);
    if (raw) return JSON.parse(raw);
  } catch(e) { console.error('loadSavingsStart error', e); }
  return { monthly: { usd: 0, ves: 0 }, weekly: { usd: 0, ves: 0 } };
}

export function saveSavingsStartToStorage(start) {
  try {
    localStorage.setItem(STORAGE_KEY_SAVINGS_START, JSON.stringify(start));
  } catch(e) { console.error('saveSavingsStart error', e); }
}

export function loadNotifiedLog() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_NOTIFIED) || '{}');
  } catch(e) { return {}; }
}

export function saveNotifiedLogToStorage(log) {
  try {
    localStorage.setItem(STORAGE_KEY_NOTIFIED, JSON.stringify(log));
  } catch(e) { console.error('saveNotifiedLog error', e); }
}

export function loadCachedHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (raw) return JSON.parse(raw);
  } catch(e) { console.error('loadCachedHistory error', e); }
  return {};
}

export function saveCachedHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  } catch(e) { console.error('saveCachedHistory error', e); }
}