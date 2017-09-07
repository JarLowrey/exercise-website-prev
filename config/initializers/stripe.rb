Rails.configuration.stripe = {
    :publishable_key => SEKRETS[:stripe][:publishable],
    :secret_key      => SEKRETS[:stripe][:secret]
}
  
Stripe.api_key = Rails.configuration.stripe[:secret_key]
  