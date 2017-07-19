module ShortIds
    @radix = ('0'..'9').to_a + ('a'..'z').to_a + ('A'..'Z').to_a + ['$','-','_','+','!','*','(',')',','] #URL safe, lowercase characters
    
    #Load blacklisted words from CSV into an iterable data structure
    @blacklist = File.read(Rails.root.join('lib', 'assets', 'blacklist_words.csv')).split('\n')
    #require 'csv' #if you have a more complicated CSV setup
    #@blacklist = CSV.parse(@blacklist, :headers => true, :encoding => 'ISO-8859-1')


    def self.create_id(max_len)
        id = ""
        #concat random letters from the radix together
        (1..max_len).each do |i|
            id.concat(@radix.sample)
        end
        return id
    end

    def self.id_is_acceptable?(id, model)
        #ensure no bad words in ID
        id_bad=false            
        @blacklist.each    do |word|
            id_bad = id.include? word
            break if id_bad #choose a new id if this one has a blacklisted word
        end

        #ensure no other tuple already has this id
        id_bad = id_bad or model.exists?(id)

        return (not id_bad)
    end

    #Create an unused id for a given model
    def self.new(model, max_len = 5)
        id = 0
        loop do
            id = self.create_id(max_len)
            break if self.id_is_acceptable?(id,model)
        end
        return id
    end
end