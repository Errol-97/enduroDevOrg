public class StringArrayUtility {

    public class StringArrayRequest {
        @InvocableVariable(required=true)
        public String commaSeparatedString;
    }

    public class StringArrayResponse {
        @InvocableVariable
        public List<String> stringArray;
    }

    @InvocableMethod(label='Split String to Array' description='Splits a comma-separated string into a list of strings.')
    public static List<StringArrayResponse> splitStringToArray(List<StringArrayRequest> requests) {
        List<StringArrayResponse> responses = new List<StringArrayResponse>();
        for (StringArrayRequest req : requests) {
            StringArrayResponse res = new StringArrayResponse();
            res.stringArray = req.commaSeparatedString.split(',');
            responses.add(res);
        }
        return responses;
    }
}
