/**
 * Creates an array of arrays containing "pointsPerArray" random values.
 * @param count
 *     The number of arrays
 * @param pointsPerArray
 *     The data-points per array
 * @param maxValue
 *     The range of the data-points [0, maxValue] (Yep, including maxValue. Thus the squared brackets ;) )
 */
function randomData(count, pointsPerArray, maxValue)
{     
    // The later returned array containing the arrays.
    var data = [];
    
    // Create "count" arrays in this array and fill it with "pointsPerArray" data-points
    for(var i = 0; i < count; i++)
    {
        data[i] = [];
        for(var j = 0; j < pointsPerArray; j++)
        {
            // Math.random generates values in the range of [0, 1)
            // So use floor and add one to fullfil the range with the max-value
            data[i][j] = Math.floor(Math.random()*maxValue+1);        
        }
    }
    return data;
}
