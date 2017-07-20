class Ability
  include CanCan::Ability

  def initialize(user)
    alias_action :create, :read, :update, :destroy, to: :crud
    alias_action :create, :update, :destroy, to: :write
    event_role_tables = [Event::Coach, Event::Organizer, Event::Participant]
    
    user ||= User.new # guest user (not logged in)

    #events
    can [:read, :create], Event
    can [:remove_curr_usr_as_participant_from, :add_curr_usr_as_participant_to], Event 
    can [:remove_usr_as_organizer_from, :add_usr_as_organizer_to,
          :remove_usr_as_coach_from, :add_usr_as_coach_to], Event 
    can [:update, :destroy], Event do |event| 
      user.id != nil and event.organizers.where(user_id: user.id).first.id == user.id #can modify an event if they organized it
    end

    #event roles
    can :read, event_role_tables
    can :write, event_role_tables do |role|
      usr_is_event_organizer = Event.find(role.event_id).organizers.exists?(user_id: user.user_id)
      user.id != nil and (role.user.id == user.id or usr_is_event_organizer)
    end

    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
