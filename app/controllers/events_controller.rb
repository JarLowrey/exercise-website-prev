class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
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
    @social_profile = @event.social_profiles.build
    @exercise_instances = @event.exercise_instances.build
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(event_params)
    respond_to do |format|
      if @event.save
        #create the default event roles for the current_user that created the event
        @event.participants.create(user_id: current_user.id)
        Event::Creator.create(user_id: current_user.id, event_id: @event.id)

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


  def rm_role    
    event = Event.find(params[:id])    
    model = select_role_model(params[:role])    
    model.find_by(event_id: event.id, user_id: current_user.id).destroy
    msg = "You are no longer participating."

    redirect_to event, notice: msg    
  end

  def add_role
    event = Event.find(params[:id])
    model = select_role_model(params[:role])
    model.create(event_id: event.id, user_id: current_user.id)
    msg = "You are now participating!"

    redirect_to event, notice: msg
  end

  def map_search
    local_events = search_for_local_events
    render json: local_events, only: [:id,:name,:start], include: { address: { only: [:latitude,:longitude,:street_address] },  exercise_instances: {include: :exercise}}
  end

  def listing_search
    local_events = search_for_local_events
    render json: local_events, only: [:id,:name,:description,:start], include: { address: { only: [:latitude,:longitude,:street_address] },  exercise_instances: {include: :exercise}}
  end

  private

  def search_for_local_events
    #check for required params before searching
    all_keys_present = params.has_key?(:sw_lat) and
    params.has_key?(:ne_lat) and
    params.has_key?(:sw_lng) and
    params.has_key?(:ne_lng) 
    if not all_keys_present
      return
    end
    
    #search database for local events using given params
    local_events = Event.includes(:address).references(:address)
      .where("latitude >= ? AND latitude <= ? AND longitude >= ? AND longitude <= ? AND 
        start >= ? AND start <= ?",       
          params[:sw_lat], params[:ne_lat], params[:sw_lng], params[:ne_lng],
          params[:start_time] || DateTime.now, params[:end_time] || (DateTime.now + 365),
          )
      .limit(50) # arbitrary limit, just so things don't get drowned out/too full on the map
  end

  def select_role_model(role)
    roles = Event::Participant.event_role_types
    case role
      when String(roles[:admin])
        model = Event::Admin
      when String(roles[:creator])
        model = Event::Creator
      when String(roles[:worker])
        model = Event::Worker
      when String(roles[:participant])
        model = Event::Participant
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = Event.find(params[:id])
    @current_user_is_participating = @event.participants.find_by(user_id: current_user.id) != nil if user_signed_in?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def event_params
    params.require(:event)
      .permit(:name, :description, 
        :cost,
        :start, 
        :min_participants, :max_participants,
        { address_attributes: [:address, :longitude, :latitude] },
        { social_profiles_attributes: [:id, :_destroy, :name, :url] },
        { exercise_instances_attributes: [:id, :_destroy, :distance, :duration, :exercise_name] }
    )
  end
end
