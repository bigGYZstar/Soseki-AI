import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "soseki_ai_settings";
const ONBOARDING_KEY = "soseki_ai_onboarding_complete";

export interface Settings {
  showEnglish: boolean;
  allowCloud: boolean;
}

const defaultSettings: Settings = {
  showEnglish: false,
  allowCloud: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = useCallback(async (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }, [settings]);

  const clearAllData = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([SETTINGS_KEY, ONBOARDING_KEY, "soseki_ai_chat_history"]);
      setSettings(defaultSettings);
    } catch (error) {
      console.error("Failed to clear data:", error);
    }
  }, []);

  return {
    settings,
    loading,
    updateSettings,
    clearAllData,
  };
}

export function useOnboarding() {
  const [isComplete, setIsComplete] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const stored = await AsyncStorage.getItem(ONBOARDING_KEY);
      setIsComplete(stored === "true");
    } catch (error) {
      console.error("Failed to check onboarding:", error);
      setIsComplete(false);
    }
  };

  const completeOnboarding = useCallback(async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      setIsComplete(true);
    } catch (error) {
      console.error("Failed to save onboarding status:", error);
    }
  }, []);

  const resetOnboarding = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
      setIsComplete(false);
    } catch (error) {
      console.error("Failed to reset onboarding:", error);
    }
  }, []);

  return {
    isComplete,
    completeOnboarding,
    resetOnboarding,
  };
}
