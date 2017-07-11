module ShortIds
    @radix = ('0'..'9').to_a + ('a'..'z').to_a + ['$','-','_','+','!','*','(',')',','] #URL safe, lowercase characters

    #Load blacklisted words from CSV into an iterable data structure
    @blacklist = File.read(Rails.root.join('lib', 'assets', 'blacklist_words.csv')).split('\n')
    #require 'csv' #if you have a more complicated CSV setup
    #@blacklist = CSV.parse(@blacklist, :headers => true, :encoding => 'ISO-8859-1')

    # Source: https://stackoverflow.com/questions/9827498/why-does-the-fixnumto-s-method-in-in-ruby-only-accept-radixes-from-2-to-36
    # generate string representation of integer, using digits from custom alphabet
    # [val] a value which can be cast to integer
    # [digits] a string or array of strings representing the custom digits
    def self.custom_radix_to_s val, digits
        digits = digits.to_a unless digits.respond_to? :[]
        radix = digits.length
        raise ArgumentError, "radix must have at least two digits" if radix < 2

        i = val.to_i
        out = []
        begin
        rem = i % radix
        i /= radix
        out << digits[rem..rem]
        end until i == 0

        out.reverse.join
    end

    #Create an unused id for a given model
    def self.new(model, max_len=7)
        id=0
        max = @radix.length**max_len #what is the highest value given a set number of characters? For base 10 and 3 characters, it's 10*10*10 = 10**3
        loop do
            id = rand(1..max) #choose random ID in allowed range
            id = ShortIds.custom_radix_to_s(id, @radix) #convert base 10 ID to custom base

            #ensure no bad words in ID
            id_bad=false            
            @blacklist.each do |word|
                id_bad = id.include? word
                break if id_bad #choose a new id if this one has a blacklisted word
            end
            
            break if not id_bad and not model.exists?(id) #stop looking for ids if this id is unique and safe
        end
        return id
    end
end