import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Crown, 
  Check, 
  Loader2, 
  Lock,
  Sparkles,
  ImageIcon,
  Ban
} from "lucide-react";

const Premium = () => {
  const navigate = useNavigate();
  const { user, isPremium, loading: authLoading } = useAuth();
  const [transactionId, setTransactionId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingRequest, setPendingRequest] = useState<any>(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const checkExistingRequest = async () => {
      if (!user) return;

      // Check if user has any previous approved payments
      const { data: approvedPayments } = await supabase
        .from('payment_requests')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .limit(1);

      setIsFirstTime(!approvedPayments || approvedPayments.length === 0);

      // Check pending request
      const { data: pending } = await supabase
        .from('payment_requests')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(1);

      if (pending && pending.length > 0) {
        setPendingRequest(pending[0]);
      }
    };

    checkExistingRequest();
  }, [user]);

  const handleSubmitPayment = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter your transaction ID");
      return;
    }

    if (!user) {
      navigate("/auth");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('payment_requests')
        .insert({
          user_id: user.id,
          amount: isFirstTime ? 10 : 99,
          payment_type: isFirstTime ? 'first_month' : 'regular',
          transaction_id: transactionId.trim(),
          status: 'pending'
        });

      if (error) throw error;

      toast.success("Payment request submitted!", {
        description: "We'll verify and activate your premium within 24 hours"
      });

      setPendingRequest({
        transaction_id: transactionId,
        amount: isFirstTime ? 10 : 99,
        status: 'pending'
      });
      setTransactionId("");
    } catch (error) {
      console.error("Payment submit error:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Premium</h1>
                <p className="text-xs text-muted-foreground">Unlock Everything</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        {isPremium ? (
          /* Already Premium */
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 text-center">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">You're Premium!</h2>
            <p className="text-muted-foreground mb-6">
              Enjoy unlimited wallpapers and ad-free experience
            </p>
            <Button
              className="bg-gradient-to-r from-yellow-500 to-orange-500"
              onClick={() => navigate("/premium-wallpapers")}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              View Premium Wallpapers
            </Button>
          </div>
        ) : (
          <>
            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Go Premium</h2>
              </div>

              <div className="text-center mb-6">
                {isFirstTime ? (
                  <div>
                    <div className="text-4xl font-bold text-primary">₹10</div>
                    <p className="text-sm text-muted-foreground">First month only!</p>
                    <p className="text-xs text-muted-foreground mt-1">Then ₹99/month</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl font-bold text-primary">₹99</div>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span>Unlimited AI wallpaper generation</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span>50+ exclusive premium wallpapers</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Ban className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span>No ads - clean experience</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <ImageIcon className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span>Early access to new features</span>
                </li>
              </ul>
            </div>

            {/* Payment Section */}
            {pendingRequest ? (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />
                  <div>
                    <p className="font-medium text-foreground">Payment Pending Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Transaction ID: {pendingRequest.transaction_id}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll verify within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Pay via Paytm</h3>
                
                <div className="bg-muted rounded-xl p-4 mb-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Send payment to:</p>
                  <p className="text-xl font-bold text-primary">9876543210@paytm</p>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    ₹{isFirstTime ? "10" : "99"}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Enter Transaction ID after payment:
                    </label>
                    <Input
                      placeholder="e.g., TXN123456789"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500"
                    onClick={handleSubmitPayment}
                    disabled={submitting || !transactionId.trim()}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Crown className="w-4 h-4 mr-2" />
                        Submit Payment
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Your premium will be activated within 24 hours after verification
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Premium;
