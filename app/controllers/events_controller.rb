class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy, :add_participant_to, :remove_participant_from]
  load_and_authorize_resource
  
  # GET /events
  # GET /events.json
  def index
    @events = Event.all
  end

  # GET /events/1
  # GET /events/1.json
  def show
    #redirect to a readable URL
    readable_txt = @event.name.parameterize
    if ShortenableUrls.redirect_for_readability?(request, @event.id, readable_txt)
      redirect_to "/events/#{@event.id}/#{readable_txt}"
      return
    end
  end

  # GET /events/new
  def new
    @event = Event.new
    @address = @event.build_address
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(event_params)
    #@event.address.addressable = @event #ensure that address's addressable exists
    respond_to do |format|
      if @event.save
        add_as_participant(current_user) if user_signed_in? 
        add_as_organizer(current_user) if user_signed_in?
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  #Event-role table's tuple creation/deletion
  def add_curr_usr_as_participant_to
    add_as_participant(current_user)
    redirect_to @event, notice: 'You are now participating in this event!'
  end
  def remove_curr_usr_as_participant_from
    if @participant != nil
      @participant.destroy
    end
    byebug
    redirect_to @event, notice: 'You are no longer participating in this event.'
  end

  def add_curr_usr_as_organizer_to
    add_as_organizer(current_user)
    redirect_to @event, notice: 'You are now organizing this event!'
  end
  def remove_curr_usr_as_organizer_from
    if @organizer != nil
      @organizer.destroy
    end
    redirect_to @event, notice: 'You are no longer organizing this event.'
  end

  def add_curr_usr_as_coach_to
    add_as_coach(current_user)
    redirect_to @event, notice: 'You are now coaching this event!'
  end
  def remove_curr_usr_as_coach_from
    if @coach != nil
      @coach.destroy
    end
    redirect_to @event, notice: 'You are no longer coaching this event.'
  end

  private
    def add_as_participant(user)
      @event.participants.create(user_id: user.id)
    end
    def add_as_organizer(user)
      @event.organizers.create(user_id: user.id)
    end
    def add_as_coach(user)
      @event.coaches.create(user_id: user.id)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
      if user_signed_in? 
        @participant = @event.participants.where(user_id: current_user.id).first
        @organizer = @event.organizers.where(user_id: current_user.id).first
        @coach = @event.coaches.where(user_id: current_user.id).first
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(:name, :cost, :description, { address_attributes: [:address, :longitude, :latitude] } ) #address_attributes -> :longitude, :latitude
    end
end
