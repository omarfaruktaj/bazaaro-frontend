"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Globe,
  Moon,
  Sun,
  Monitor,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Eye,
  Palette,
  Languages,
  Clock,
  Shield,
  Download,
  Trash2,
  Settings,
  Save,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PreferencesData {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
    orderUpdates: boolean;
    newProducts: boolean;
    priceAlerts: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private" | "friends";
    showOnlineStatus: boolean;
    allowDataCollection: boolean;
    personalizedAds: boolean;
  };
  display: {
    itemsPerPage: number;
    compactView: boolean;
    showPrices: boolean;
    autoPlayVideos: boolean;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reduceMotion: boolean;
    screenReader: boolean;
  };
}

export default function PreferencesSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [preferences, setPreferences] = useState<PreferencesData>({
    theme: "system",
    language: "en",
    timezone: "UTC",
    currency: "USD",
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false,
      orderUpdates: true,
      newProducts: true,
      priceAlerts: true,
    },
    privacy: {
      profileVisibility: "public",
      showOnlineStatus: true,
      allowDataCollection: false,
      personalizedAds: false,
    },
    display: {
      itemsPerPage: 20,
      compactView: false,
      showPrices: true,
      autoPlayVideos: false,
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      reduceMotion: false,
      screenReader: false,
    },
  });

  const updatePreference = (
    section: keyof PreferencesData,
    key: string,
    value: string | number | boolean
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...(typeof prev[section] === "object" && prev[section] !== null
          ? prev[section]
          : {}),
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateTopLevelPreference = (
    key: keyof PreferencesData,
    value:
      | PreferencesData["theme"]
      | PreferencesData["language"]
      | PreferencesData["timezone"]
      | PreferencesData["currency"]
      | PreferencesData["notifications"]
      | PreferencesData["privacy"]
      | PreferencesData["display"]
      | PreferencesData["accessibility"]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Preferences saved successfully!");
      setHasChanges(false);
    } catch {
      toast.error("Failed to save preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPreferences({
      theme: "system",
      language: "en",
      timezone: "UTC",
      currency: "USD",
      notifications: {
        email: true,
        push: true,
        sms: false,
        marketing: false,
        orderUpdates: true,
        newProducts: true,
        priceAlerts: true,
      },
      privacy: {
        profileVisibility: "public",
        showOnlineStatus: true,
        allowDataCollection: false,
        personalizedAds: false,
      },
      display: {
        itemsPerPage: 20,
        compactView: false,
        showPrices: true,
        autoPlayVideos: false,
      },
      accessibility: {
        highContrast: false,
        largeText: false,
        reduceMotion: false,
        screenReader: false,
      },
    });
    setHasChanges(true);
    toast.info("Preferences reset to defaults");
  };

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" },
    { value: "ru", label: "Русский" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
    { value: "zh", label: "中文" },
  ];

  const timezones = [
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
  ];

  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" },
    { value: "CHF", label: "Swiss Franc (CHF)" },
    { value: "CNY", label: "Chinese Yuan (¥)" },
    { value: "INR", label: "Indian Rupee (₹)" },
    { value: "BRL", label: "Brazilian Real (R$)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Save/Reset Actions */}
      {hasChanges && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            You have unsaved changes. Don't forget to save your preferences.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
          <p className="text-gray-600">
            Customize your account settings and experience
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic preferences for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Theme Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Palette className="h-4 w-4 mr-2" />
                Theme Preference
              </Label>
              <RadioGroup
                value={preferences.theme}
                onValueChange={(value) =>
                  updateTopLevelPreference("theme", value)
                }
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label
                    htmlFor="light"
                    className="flex items-center cursor-pointer"
                  >
                    <Sun className="h-4 w-4 mr-1" />
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label
                    htmlFor="dark"
                    className="flex items-center cursor-pointer"
                  >
                    <Moon className="h-4 w-4 mr-1" />
                    Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label
                    htmlFor="system"
                    className="flex items-center cursor-pointer"
                  >
                    <Monitor className="h-4 w-4 mr-1" />
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Language Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Languages className="h-4 w-4 mr-2" />
                Language
              </Label>
              <Select
                value={preferences.language}
                onValueChange={(value) =>
                  updateTopLevelPreference("language", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Timezone Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Timezone
              </Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) =>
                  updateTopLevelPreference("timezone", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Currency Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Currency
              </Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) =>
                  updateTopLevelPreference("currency", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Choose how you want to be notified
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Notification Channels */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">
                Notification Channels
              </Label>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="email-notifications"
                    className="flex items-center cursor-pointer"
                  >
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={preferences.notifications.email}
                    onCheckedChange={(checked) =>
                      updatePreference("notifications", "email", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="push-notifications"
                    className="flex items-center cursor-pointer"
                  >
                    <Smartphone className="h-4 w-4 mr-2 text-gray-500" />
                    Push Notifications
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={preferences.notifications.push}
                    onCheckedChange={(checked) =>
                      updatePreference("notifications", "push", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="sms-notifications"
                    className="flex items-center cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                    SMS Notifications
                  </Label>
                  <Switch
                    id="sms-notifications"
                    checked={preferences.notifications.sms}
                    onCheckedChange={(checked) =>
                      updatePreference("notifications", "sms", checked)
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Notification Types */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Notification Types</Label>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="order-updates" className="cursor-pointer">
                    Order Updates
                    <p className="text-xs text-gray-500">
                      Get notified about your order status
                    </p>
                  </Label>
                  <Switch
                    id="order-updates"
                    checked={preferences.notifications.orderUpdates}
                    onCheckedChange={(checked) =>
                      updatePreference("notifications", "orderUpdates", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="new-products" className="cursor-pointer">
                    New Products
                    <p className="text-xs text-gray-500">
                      Be the first to know about new arrivals
                    </p>
                  </Label>
                  <Switch
                    id="new-products"
                    checked={preferences.notifications.newProducts}
                    onCheckedChange={(checked) =>
                      updatePreference("notifications", "newProducts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="price-alerts" className="cursor-pointer">
                    Price Alerts
                    <p className="text-xs text-gray-500">
                      Get notified when prices drop
                    </p>
                  </Label>
                  <Switch
                    id="price-alerts"
                    checked={preferences.notifications.priceAlerts}
                    onCheckedChange={(checked) =>
                      updatePreference("notifications", "priceAlerts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing" className="cursor-pointer">
                    Marketing & Promotions
                    <p className="text-xs text-gray-500">
                      Receive promotional offers and deals
                    </p>
                  </Label>
                  <Switch
                    id="marketing"
                    checked={preferences.notifications.marketing}
                    onCheckedChange={(checked) =>
                      updatePreference("notifications", "marketing", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Privacy Settings
            </CardTitle>
            <CardDescription>
              Control your privacy and data sharing
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Profile Visibility */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Profile Visibility</Label>
              <RadioGroup
                value={preferences.privacy.profileVisibility}
                onValueChange={(value) =>
                  updatePreference("privacy", "profileVisibility", value)
                }
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="cursor-pointer">
                    Public
                    <p className="text-xs text-gray-500">
                      Anyone can see your profile
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="cursor-pointer">
                    Private
                    <p className="text-xs text-gray-500">
                      Only you can see your profile
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends" className="cursor-pointer">
                    Friends Only
                    <p className="text-xs text-gray-500">
                      Only your friends can see your profile
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Privacy Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="online-status" className="cursor-pointer">
                  Show Online Status
                  <p className="text-xs text-gray-500">
                    Let others see when you're online
                  </p>
                </Label>
                <Switch
                  id="online-status"
                  checked={preferences.privacy.showOnlineStatus}
                  onCheckedChange={(checked) =>
                    updatePreference("privacy", "showOnlineStatus", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="data-collection" className="cursor-pointer">
                  Allow Data Collection
                  <p className="text-xs text-gray-500">
                    Help improve our services with usage data
                  </p>
                </Label>
                <Switch
                  id="data-collection"
                  checked={preferences.privacy.allowDataCollection}
                  onCheckedChange={(checked) =>
                    updatePreference("privacy", "allowDataCollection", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="personalized-ads" className="cursor-pointer">
                  Personalized Advertisements
                  <p className="text-xs text-gray-500">
                    Show ads based on your interests
                  </p>
                </Label>
                <Switch
                  id="personalized-ads"
                  checked={preferences.privacy.personalizedAds}
                  onCheckedChange={(checked) =>
                    updatePreference("privacy", "personalizedAds", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary" />
              Display Settings
            </CardTitle>
            <CardDescription>
              Customize how content is displayed
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Items Per Page */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Items Per Page: {preferences.display.itemsPerPage}
              </Label>
              <Slider
                value={[preferences.display.itemsPerPage]}
                onValueChange={(value) =>
                  updatePreference("display", "itemsPerPage", value[0])
                }
                max={50}
                min={10}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10</span>
                <span>50</span>
              </div>
            </div>

            <Separator />

            {/* Display Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view" className="cursor-pointer">
                  Compact View
                  <p className="text-xs text-gray-500">
                    Show more items in less space
                  </p>
                </Label>
                <Switch
                  id="compact-view"
                  checked={preferences.display.compactView}
                  onCheckedChange={(checked) =>
                    updatePreference("display", "compactView", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-prices" className="cursor-pointer">
                  Show Prices
                  <p className="text-xs text-gray-500">
                    Display product prices in listings
                  </p>
                </Label>
                <Switch
                  id="show-prices"
                  checked={preferences.display.showPrices}
                  onCheckedChange={(checked) =>
                    updatePreference("display", "showPrices", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-play-videos" className="cursor-pointer">
                  Auto-play Videos
                  <p className="text-xs text-gray-500">
                    Automatically play product videos
                  </p>
                </Label>
                <Switch
                  id="auto-play-videos"
                  checked={preferences.display.autoPlayVideos}
                  onCheckedChange={(checked) =>
                    updatePreference("display", "autoPlayVideos", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Settings */}
        <Card className="border shadow-sm lg:col-span-2">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary" />
              Accessibility Settings
            </CardTitle>
            <CardDescription>
              Make the platform more accessible for your needs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="cursor-pointer">
                    High Contrast Mode
                    <p className="text-xs text-gray-500">
                      Increase contrast for better visibility
                    </p>
                  </Label>
                  <Switch
                    id="high-contrast"
                    checked={preferences.accessibility.highContrast}
                    onCheckedChange={(checked) =>
                      updatePreference("accessibility", "highContrast", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="large-text" className="cursor-pointer">
                    Large Text
                    <p className="text-xs text-gray-500">
                      Increase text size for better readability
                    </p>
                  </Label>
                  <Switch
                    id="large-text"
                    checked={preferences.accessibility.largeText}
                    onCheckedChange={(checked) =>
                      updatePreference("accessibility", "largeText", checked)
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduce-motion" className="cursor-pointer">
                    Reduce Motion
                    <p className="text-xs text-gray-500">
                      Minimize animations and transitions
                    </p>
                  </Label>
                  <Switch
                    id="reduce-motion"
                    checked={preferences.accessibility.reduceMotion}
                    onCheckedChange={(checked) =>
                      updatePreference("accessibility", "reduceMotion", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="screen-reader" className="cursor-pointer">
                    Screen Reader Support
                    <p className="text-xs text-gray-500">
                      Optimize for screen reader compatibility
                    </p>
                  </Label>
                  <Switch
                    id="screen-reader"
                    checked={preferences.accessibility.screenReader}
                    onCheckedChange={(checked) =>
                      updatePreference("accessibility", "screenReader", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card className="border shadow-sm border-red-200">
        <CardHeader className="bg-red-50 border-b border-red-200">
          <CardTitle className="flex items-center text-red-700">
            <Trash2 className="h-5 w-5 mr-2" />
            Data Management
          </CardTitle>
          <CardDescription className="text-red-600">
            Manage your account data and privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Export Your Data
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Download a copy of all your account data including orders,
                  reviews, and preferences.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Request Data Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Delete Account
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
