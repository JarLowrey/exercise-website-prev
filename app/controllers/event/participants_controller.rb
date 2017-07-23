class ParticipantsController::EventsController < ApplicationController
  def add_or_rm_role 
    model = nil
    event = Event.find(event_participants_params.event_id)
    roles = Event::Participant.event_role_types
    case event_participants_params.role
      when roles[:admin]
        model = Event::Admin
      when roles[:creator]
        model = Event::Creator
      when roles[:worker]
        model = Event::Worker
      when roles[:participant]
        model = Event::Participant
    
    mod_role(model, event_participants_params.is_add, event.id, current_user.id)

    redirect_to event, notice: 'Changes have beend saved!'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def event_participants_params
      params.permit(:role, :is_add, :event, :user_id)
    end

    def mod_role(model, is_add, evt_id, usr_id)
      if is_add
        model.create(event_id: evt_id, user_id: usr_id)
      else
        model.find(event_id: evt_id, user_id: usr_id).destroy
      end
    end
end
