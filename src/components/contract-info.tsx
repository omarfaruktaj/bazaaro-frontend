import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, CreditCard, Mail, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface UserInfo {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Billing Address
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  // Shipping Address
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  // Preferences
  sameAsShipping: boolean;
  saveInfo: boolean;
  marketingEmails: boolean;
  orderNotes: string;
}
export default function ContractInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
    sameAsShipping: true,
    saveInfo: false,
    marketingEmails: false,
    orderNotes: "",
  });
  const countries = [
    { value: "BD", label: "Bangladesh" },
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "IN", label: "India" },
  ];

  const states = [
    { value: "DK", label: "Dhaka" },
    { value: "AL", label: "Alabama" },
    { value: "CA", label: "California" },
    { value: "FL", label: "Florida" },
    { value: "NY", label: "New York" },
    { value: "TX", label: "Texas" },
  ];
  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");

      setUserInfo((prev) => {
        const parentValue = prev[parent as keyof UserInfo] as Record<
          string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          any
        >;

        return {
          ...prev,
          [parent]: {
            ...parentValue,
            [child]: value,
          },
        };
      });
    } else {
      setUserInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: checked,
    }));

    // If "same as shipping" is checked, copy shipping to billing
    if (field === "sameAsShipping" && checked) {
      setUserInfo((prev) => ({
        ...prev,
        billingAddress: { ...prev.shippingAddress },
      }));
    }
  };

  const copyShippingToBilling = () => {
    toast.success("Shipping address copied to billing");
  };

  return (
    <div>
      <Card className="overflow-hidden shadow-lg border-0">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-semibold flex items-center">
            <User className="mr-2 h-5 w-5 text-primary" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={userInfo.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={userInfo.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                className="pl-10"
                value={userInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                className="pl-10"
                value={userInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden shadow-lg border-0">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-semibold flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="shippingStreet">Street Address *</Label>
            <Input
              id="shippingStreet"
              value={userInfo.shippingAddress.street}
              onChange={(e) =>
                handleInputChange("shippingAddress.street", e.target.value)
              }
              placeholder="Enter your street address"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shippingCity">City *</Label>
              <Input
                id="shippingCity"
                value={userInfo.shippingAddress.city}
                onChange={(e) =>
                  handleInputChange("shippingAddress.city", e.target.value)
                }
                placeholder="Enter your city"
              />
            </div>
            <div>
              <Label htmlFor="shippingState">State *</Label>
              <Select
                value={userInfo.shippingAddress.state}
                onValueChange={(value) =>
                  handleInputChange("shippingAddress.state", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shippingZip">ZIP Code *</Label>
              <Input
                id="shippingZip"
                value={userInfo.shippingAddress.zipCode}
                onChange={(e) =>
                  handleInputChange("shippingAddress.zipCode", e.target.value)
                }
                placeholder="Enter ZIP code"
              />
            </div>
            <div>
              <Label htmlFor="shippingCountry">Country *</Label>
              <Select
                value={userInfo.shippingAddress.country}
                onValueChange={(value) =>
                  handleInputChange("shippingAddress.country", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card className="overflow-hidden shadow-lg border-0">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-semibold flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Billing Address
            </div>
            {!userInfo.sameAsShipping && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={copyShippingToBilling}
                className="flex items-center gap-2 bg-transparent"
              >
                <Copy className="h-4 w-4" />
                Copy from shipping
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsShipping"
              checked={userInfo.sameAsShipping}
              onCheckedChange={(checked) =>
                handleCheckboxChange("sameAsShipping", checked as boolean)
              }
            />
            <Label htmlFor="sameAsShipping">Same as shipping address</Label>
          </div>

          {!userInfo.sameAsShipping && (
            <>
              <div>
                <Label htmlFor="billingStreet">Street Address *</Label>
                <Input
                  id="billingStreet"
                  value={userInfo.billingAddress.street}
                  onChange={(e) =>
                    handleInputChange("billingAddress.street", e.target.value)
                  }
                  placeholder="Enter billing street address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingCity">City *</Label>
                  <Input
                    id="billingCity"
                    value={userInfo.billingAddress.city}
                    onChange={(e) =>
                      handleInputChange("billingAddress.city", e.target.value)
                    }
                    placeholder="Enter billing city"
                  />
                </div>
                <div>
                  <Label htmlFor="billingState">State *</Label>
                  <Select
                    value={userInfo.billingAddress.state}
                    onValueChange={(value) =>
                      handleInputChange("billingAddress.state", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingZip">ZIP Code *</Label>
                  <Input
                    id="billingZip"
                    value={userInfo.billingAddress.zipCode}
                    onChange={(e) =>
                      handleInputChange(
                        "billingAddress.zipCode",
                        e.target.value
                      )
                    }
                    placeholder="Enter billing ZIP code"
                  />
                </div>
                <div>
                  <Label htmlFor="billingCountry">Country *</Label>
                  <Select
                    value={userInfo.billingAddress.country}
                    onValueChange={(value) =>
                      handleInputChange("billingAddress.country", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card className="overflow-hidden shadow-lg border-0">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-semibold">
            Additional Options
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
            <Textarea
              id="orderNotes"
              value={userInfo.orderNotes}
              onChange={(e) => handleInputChange("orderNotes", e.target.value)}
              placeholder="Any special instructions for your order..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="saveInfo"
                checked={userInfo.saveInfo}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("saveInfo", checked as boolean)
                }
              />
              <Label htmlFor="saveInfo">
                Save this information for next time
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketingEmails"
                checked={userInfo.marketingEmails}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("marketingEmails", checked as boolean)
                }
              />
              <Label htmlFor="marketingEmails">
                I'd like to receive marketing emails about new products and
                offers
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
