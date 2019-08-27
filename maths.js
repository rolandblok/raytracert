let quadratic_epsilon = 1.0e-12;

function solve_quadratic(coefficient_order_2, coefficient_order_1, coefficient_order_0) {
    let a = coefficient_order_2;
    let b = coefficient_order_1;
    let c = coefficient_order_0;

    let discriminant = b*b - 4.0*a*c;

    if (discriminant < -quadratic_epsilon) {
        return [];
    } else if (discriminant > quadratic_epsilon) {
        let d = Math.sqrt(discriminant);
        return [(-b+d)/(2*a), (-b-d)/(2*a)];
    } else {
        return [-b/(2.0*a)];
    }
}