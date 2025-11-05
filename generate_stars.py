import json
import random
import math

def generate_efficient_frontier_stars(num_stars=3000):
    """
    Generate stars representing the Markowitz efficient frontier on a sphere.
    Uses the geometric interpretation: efficient frontier as a great-circle arc
    on the risk-metric sphere, connecting minimum-variance to tangency portfolio.
    """
    stars = []

    # Generate stars along the efficient frontier with higher density
    frontier_stars = int(num_stars * 0.7)  # 70% on the frontier
    background_stars = num_stars - frontier_stars

    # Sphere radius - all stars at same distance (equal-risk surfaces)
    sphere_radius = 300

    # Efficient frontier as great circle arc
    # In (σ, μ) space: μ = μ_min + k*sqrt(σ² - σ²_min)
    # Parameters for the frontier
    sigma_min = 0.1    # Minimum volatility
    mu_min = 0.05      # Return at minimum variance
    sharpe_slope = 1.5 # Slope toward tangency portfolio

    for i in range(frontier_stars):
        # Parameter along the frontier (0 = min variance, 1 = high return)
        t = random.random()

        # Efficient frontier in (σ, μ) space - upper branch of hyperbola
        sigma = sigma_min + t * 0.4  # Risk from 0.1 to 0.5
        mu = mu_min + sharpe_slope * math.sqrt(sigma**2 - sigma_min**2)

        # Stereographic projection from (σ, μ) plane to sphere
        # Map the 2D efficient frontier curve onto the sphere surface

        # Normalize (σ, μ) to fit nicely on sphere
        # Use stereographic projection: (x, y) -> sphere
        x = sigma * 5  # Scale for visualization
        y = mu * 5

        # Stereographic projection formula
        r_sq = x**2 + y**2
        denom = 1 + r_sq

        # Cartesian coordinates on unit sphere
        xs = 2 * x / denom
        ys = 2 * y / denom
        zs = (r_sq - 1) / denom

        # Add small noise perpendicular to the great circle
        noise_scale = 0.03
        noise_x = random.gauss(0, noise_scale)
        noise_y = random.gauss(0, noise_scale)
        noise_z = random.gauss(0, noise_scale)

        xs += noise_x
        ys += noise_y
        zs += noise_z

        # Renormalize to sphere surface
        norm = math.sqrt(xs**2 + ys**2 + zs**2)
        if norm > 0:
            xs /= norm
            ys /= norm
            zs /= norm

        # Convert to spherical coordinates (θ, φ)
        theta = math.atan2(zs, xs)  # Longitude
        phi = math.asin(max(-1, min(1, ys)))  # Latitude

        # Small distance variation for depth perception
        distance = sphere_radius + random.gauss(0, 3)

        # Convert to RA/Dec
        ra = math.degrees(theta) % 360
        dec = math.degrees(phi)

        # Magnitude varies slightly
        magnitude = random.uniform(-0.5, 2.0)

        stars.append({
            "name": f"EF-Star-{i+1}",
            "ra": round(ra, 3),
            "dec": round(dec, 3),
            "magnitude": round(magnitude, 2),
            "color": "#ffffff",
            "distance": round(distance, 1),
            "risk": round(sigma, 3),
            "return": round(mu, 3),
            "sharpe": round(mu / sigma if sigma > 0 else 0, 3)
        })

    # Generate background stars uniformly on sphere surface
    for i in range(background_stars):
        # Uniform distribution on sphere using correct spherical sampling
        theta = random.uniform(0, 2 * math.pi)
        phi = math.asin(random.uniform(-1, 1))

        # Small distance variation
        distance = sphere_radius + random.gauss(0, 8)

        ra = math.degrees(theta) % 360
        dec = math.degrees(phi)
        magnitude = random.uniform(0.5, 3.0)

        stars.append({
            "name": f"BG-Star-{i+1}",
            "ra": round(ra, 3),
            "dec": round(dec, 3),
            "magnitude": round(magnitude, 2),
            "color": "#ffffff",
            "distance": round(distance, 1)
        })

    return stars

def main():
    print("Generating star catalog with Markowitz Efficient Frontier distribution...")
    stars = generate_efficient_frontier_stars(num_stars=3000)

    data = {
        "stars": stars,
        "metadata": {
            "description": "Star catalog with density following Markowitz Efficient Frontier",
            "total_stars": len(stars),
            "frontier_concentration": "60% of stars follow the efficient frontier curve"
        }
    }

    with open('data.json', 'w') as f:
        json.dump(data, f, indent=2)

    print(f"Generated {len(stars)} stars")
    print("Data saved to data.json")

if __name__ == "__main__":
    main()
